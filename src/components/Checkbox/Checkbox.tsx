import { ComponentPropsWithoutRef } from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps extends ComponentPropsWithoutRef<"input"> {
	shape?: "square" | "circle";
	checkboxContent?: "check" | "dot";
}

export default function Checkbox({
	className = "",
	shape = "square",
	checkboxContent = "check",
	children,
	...props
}: CheckboxProps) {
	return (
		<div className={styles.checkboxWrapper}>
			<input
				type="checkbox"
				className={`${styles.checkbox} ${checkboxContent === "dot" ? styles.dot : styles.check} ${className}`}
				{...props}
				style={shape === "square" ? { borderRadius: "4px" } : { borderRadius: "50%" }}
			/>
			<span className={styles.checkmark}></span>
		</div>
	);
}
