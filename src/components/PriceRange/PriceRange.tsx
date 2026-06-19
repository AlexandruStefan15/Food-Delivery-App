import React, { useCallback, useEffect, useState, useRef, ChangeEvent } from "react";
import styles from "./PriceRange.module.scss";

//components
import RangeInput from "../RangeInput/RangeInput";

interface PriceRangeProps {
	title?: string;
	min: number;
	max: number;
	step?: number;
	onChange: (values: { min: number; max: number }) => void;
}

export default function PriceRange({ title = "Price Range", min, max, step = 1, onChange }: PriceRangeProps) {
	const [minVal, setMinVal] = useState<number>(min);
	const [maxVal, setMaxVal] = useState<number>(max);

	const minValRef = useRef<number>(min);
	const maxValRef = useRef<number>(max);
	const rangeRef = useRef<HTMLDivElement>(null);

	const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

	useEffect(() => {
		const minPercent = getPercent(minVal);
		const maxPercent = getPercent(maxValRef.current);

		if (rangeRef.current) {
			rangeRef.current.style.left = `${minPercent}%`;
			rangeRef.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [minVal, getPercent]);

	useEffect(() => {
		const minPercent = getPercent(minValRef.current);
		const maxPercent = getPercent(maxVal);

		if (rangeRef.current) {
			rangeRef.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [maxVal, getPercent]);

	useEffect(() => {
		onChange({ min: minVal, max: maxVal });
	}, [minVal, maxVal]);

	return (
		<div className={styles.priceRangeContainer}>
			{title && <h2 className={styles.title}>{title}</h2>}
			<RangeInput
				min={min}
				max={max}
				value={minVal}
				step={step}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const value = Math.min(Number(event.target.value), maxVal - step);
					setMinVal(value);
					minValRef.current = value;
				}}
				className={`${styles.thumb} ${styles.thumbLeft}`}
				style={{ zIndex: minVal > max - 100 ? "5" : undefined }}
			/>

			<RangeInput
				min={min}
				max={max}
				value={maxVal}
				step={step}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					const value = Math.max(Number(event.target.value), minVal + step);
					setMaxVal(value);
					maxValRef.current = value;
				}}
				className={`${styles.thumb} ${styles.thumbRight}`}
			/>

			<div className={styles.slider}>
				<div className={styles.sliderTrack} />
				<div ref={rangeRef} className={styles.sliderRange} />

				<div className={styles.sliderValues}>
					<span>${minVal}</span>
					<span>${maxVal}</span>
				</div>
			</div>
		</div>
	);
}
