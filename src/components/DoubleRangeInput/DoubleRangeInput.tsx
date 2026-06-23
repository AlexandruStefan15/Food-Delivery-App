import React, { useCallback, useEffect, useState, useRef, ChangeEvent } from "react";
import styles from "./PriceRange.module.scss";

interface DoubleRangeInputProps {
	title?: string;
	min: number;
	max: number;
	step?: number;
	wrapperClassname?: string;
	onChange: (values: { min: number; max: number }) => void;
}

export default function DoubleRangeInput({
	title = "Price Range",
	min,
	max,
	step = 1,
	wrapperClassname = "",
	onChange,
}: DoubleRangeInputProps) {
	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);

	const rangeRef = useRef<HTMLDivElement>(null);

	const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

	useEffect(() => {
		const minPercent = getPercent(minVal);
		const maxPercent = getPercent(maxVal);

		if (rangeRef.current) {
			rangeRef.current.style.left = `${minPercent}%`;
			rangeRef.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [minVal, maxVal, getPercent]);

	useEffect(() => {
		onChange({ min: minVal, max: maxVal });
	}, [minVal, maxVal, onChange]);

	useEffect(() => {
		setMinVal(min);
		setMaxVal(max);
	}, [min, max]);

	return (
		<div className={`${styles.doubleRangeInputContainer} ${wrapperClassname}`}>
			{title && <h2 className={styles.title}>{title}</h2>}

			<input
				className={`${styles.thumb} ${styles.thumbLeft}`}
				type="range"
				min={min}
				max={max}
				value={minVal}
				step={step}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const value = Math.min(Number(event.target.value), maxVal - step);
					setMinVal(value);
				}}
				style={{ zIndex: minVal > max - 100 ? "5" : undefined }}
			/>

			<input
				className={`${styles.thumb} ${styles.thumbRight}`}
				type="range"
				min={min}
				max={max}
				value={maxVal}
				step={step}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const value = Math.max(Number(event.target.value), minVal + step);
					setMaxVal(value);
				}}
			/>

			<div className={styles.slider}>
				<div className={styles.sliderTrack} />
				<div ref={rangeRef} className={styles.sliderRange} />

				<div className={styles.sliderValues}>
					<span>{minVal}</span>
					<span>{maxVal}</span>
				</div>
			</div>
		</div>
	);
}
