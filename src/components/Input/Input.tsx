import React, { forwardRef, InputHTMLAttributes } from "react";
import styles from "./RangeInput.module.scss";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
	min: number;
	max: number;
	value: number;
	type?: string;
	ref?: React.Ref<HTMLInputElement>;
}

export default function Input({ className = "", ref, type, style, ...props }: InputProps) {
	return <input ref={ref} type={type} className={`${styles.thumb} ${className}`} style={style} {...props} />;
}
