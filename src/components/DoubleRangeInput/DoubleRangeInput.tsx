import React, { useCallback, useEffect, useState, useRef, ChangeEvent } from "react";
import styles from "./DoubleRangeInput.module.scss";

interface DoubleRangeInputProps {
	min: number;
	max: number;
	step?: number;
	wrapperClassname?: string;
	classNames?: Record<string, string>;
	valueIcon?: React.ReactNode;
	onChange: (values: { min: number; max: number }) => void;
}

export default function DoubleRangeInput({
	min,
	max,
	step = 1,
	wrapperClassname = "",
	classNames = {},
	valueIcon,
	onChange,
}: DoubleRangeInputProps) {
	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);
	const rangeRef = useRef<HTMLDivElement>(null);

	const getPercent = useCallback(
		(value: number) => {
			if (max === min) return 0;
			return Math.round(((value - min) / (max - min)) * 100);
		},
		[min, max],
	);

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
	}, [minVal, maxVal]);

	useEffect(() => {
		setMinVal(min);
		setMaxVal(max);
	}, [min, max]);

	return (
		<div className={`${styles.doubleRangeInputContainer} ${wrapperClassname}`}>
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
				<div className={styles.sliderValues + ` ${classNames.sliderValues}`}>
					<span className={styles.wrapper}>
						{valueIcon && <span className={styles.valueIcon}>{valueIcon}</span>}
						<span>{minVal}</span>
					</span>
					<span className={styles.wrapper}>
						{valueIcon && <span className={styles.valueIcon}>{valueIcon}</span>}
						<span>{maxVal}</span>
					</span>
				</div>
			</div>
		</div>
	);
}
