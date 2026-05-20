import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "default" | "primary" | "secondary" | "tertiary" | "animated" | "transparent";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
	variant?: ButtonVariant;
	icon?: ReactNode;
}

export default function Button({
	className = "",
	children,
	type = "button",
	variant = "default",
	icon,
	...props
}: ButtonProps) {
	return (
		<button className={styles[`btn_${variant}`] + ` ${className}`} type={type} {...props}>
			{icon && <span className={styles.btn_icon}>{icon}</span>}
			<span className={styles.btn_text}>{children}</span>
		</button>
	);
}
