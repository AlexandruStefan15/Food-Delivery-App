import React, { useId, useMemo, useState } from "react";
import styles from "./RangeInput.module.scss";

import { RangeInputProps, RangeInputLabel } from "./RangeInput.types";

const THUMB_SIZE = 17;

export default function RangeInput({
	value,
	defaultValue,
	min = 0,
	max = 100,
	step = 1,
	label,
	unit = "",
	markers = [],
	showValueBubble = true,
	disabled = false,
	className = "",
	onChange,
	formatValue,
	formatLabel,
}: RangeInputProps) {
	const id = useId();

	const isControlled = value !== undefined;

	const [internalValue, setInternalValue] = useState<number>(defaultValue ?? min);

	const currentValue = isControlled ? value : internalValue;

	const percent = useMemo(() => {
		if (max === min) return 0;

		const rawPercent = ((currentValue - min) / (max - min)) * 100;

		return Math.min(100, Math.max(0, rawPercent));
	}, [currentValue, min, max]);

	const bubbleLeft = useMemo(() => {
		const correction = (0.5 - percent / 100) * THUMB_SIZE;

		return `calc(${percent}% + ${correction}px)`;
	}, [percent]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nextValue = Number(event.target.value);

		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onChange?.(nextValue);
	};

	const renderValue = (nextValue: number) => {
		if (formatValue) return formatValue(nextValue);

		return unit ? `${nextValue} ${unit}` : nextValue;
	};

	const renderLabel = (nextValue: number) => {
		if (formatLabel) return formatLabel(nextValue);

		return unit ? `${nextValue} ${unit}` : nextValue;
	};

	const getPercentByValue = (nextValue: number) => {
		if (max === min) return 0;

		const rawPercent = ((nextValue - min) / (max - min)) * 100;

		return Math.min(100, Math.max(0, rawPercent));
	};

	const labels: RangeInputLabel[] = [
		{
			value: min,
			label: renderLabel(min),
		},
		...markers,
		{
			value: max,
			label: renderLabel(max),
		},
	];

	return (
		<div
			className={`${styles.container} ${className}`}
			style={
				{
					"--range-progress": `${percent}%`,
					"--range-thumb-size": `${THUMB_SIZE}px`,
				} as React.CSSProperties
			}
		>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
			)}

			<div className={styles.sliderWrap}>
				{showValueBubble && (
					<div
						className={styles.valueBubble}
						style={
							{
								left: bubbleLeft,
							} as React.CSSProperties
						}
					>
						{renderValue(currentValue)}
					</div>
				)}

				<input
					id={id}
					className={styles.input}
					type="range"
					min={min}
					max={max}
					step={step}
					value={currentValue}
					disabled={disabled}
					onChange={handleChange}
				/>
			</div>

			<div className={styles.labels}>
				{labels.map((item) => {
					const itemPercent = getPercentByValue(item.value);

					return (
						<span
							key={`${item.value}-${String(item.label)}`}
							className={item.value === currentValue ? `${styles.rangeLabel} ${styles.activeLabel}` : styles.rangeLabel}
							style={
								{
									left: `${itemPercent}%`,
								} as React.CSSProperties
							}
						>
							{item.label ?? renderLabel(item.value)}
						</span>
					);
				})}
			</div>
		</div>
	);
}
