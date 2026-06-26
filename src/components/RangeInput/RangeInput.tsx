import React, { useId, useMemo, useState } from "react";
import styles from "./RangeInput.module.scss";

import { RangeInputProps, RangeInputLabel } from "./RangeInput.types";

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
	className,
	onChange,
	formatValue,
	formatLabel,
}: RangeInputProps) {
	const id = useId();

	const isControlled = value !== undefined;

	const [internalValue, setInternalValue] = useState(defaultValue ?? min);

	const currentValue = isControlled ? value : internalValue;

	const percent = useMemo(() => {
		if (max === min) return 0;
		return ((currentValue - min) / (max - min)) * 100;
	}, [currentValue, min, max]);

	const clampPercent = Math.min(100, Math.max(0, percent));

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nextValue = Number(event.target.value);

		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onChange?.(nextValue);
	};

	const renderValue = (nextValue: number) => {
		if (formatValue) return formatValue(nextValue);
		return `${nextValue} ${unit}`;
	};

	const renderLabel = (nextValue: number) => {
		if (formatLabel) return formatLabel(nextValue);
		return `${nextValue} ${unit}`;
	};

	const allLabels: RangeInputLabel[] = [
		{ value: min, label: renderLabel(min) },
		...markers,
		{ value: max, label: renderLabel(max) },
	];

	return (
		<div
			className={`${styles.container} ${className ?? ""}`}
			style={
				{
					"--range-progress": `${clampPercent}%`,
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
								left: `${clampPercent}%`,
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
					value={currentValue}
					min={min}
					max={max}
					step={step}
					disabled={disabled}
					onChange={handleChange}
				/>
			</div>

			<div className={styles.labels}>
				{allLabels.map((item) => {
					const itemPercent = max === min ? 0 : ((item.value - min) / (max - min)) * 100;

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
