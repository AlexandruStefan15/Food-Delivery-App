import { ComponentPropsWithoutRef } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
	shape: "square" | "round";
}

export default function Checkbox({ className = "", shape = "square", children, ...props }: CheckboxProps) {
	return (
		<div className={styles.checkboxWrapper}>
			<input
				type="checkbox"
				className={`${styles.checkbox} ${className}`}
				{...props}
				style={shape === "square" ? { borderRadius: "4px" } : { borderRadius: "50%" }}
			/>
			<span className={styles.checkmark}></span>
		</div>
	);
}
