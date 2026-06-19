import React, { forwardRef, InputHTMLAttributes } from "react";
import styles from "./RangeInput.module.scss";

interface RangeInputProps extends Omit<React.ComponentPropsWithRef<"input">, "type"> {
	min: number;
	max: number;
	value: number;
	ref?: React.Ref<HTMLInputElement>;
}

export default function RangeInput({ className = "", ref, style, ...props }: RangeInputProps) {
	return <input ref={ref} type="range" className={`${styles.thumb} ${className}`} style={style} {...props} />;
}
