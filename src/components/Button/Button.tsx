import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "default" | "muted" | "primary" | "secondary" | "tertiary" | "animated" | "transparent";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
	variant?: ButtonVariant;
}

export default function Button({
	className = "",
	children,
	type = "button",
	variant = "default",
	...props
}: ButtonProps) {
	return (
		<button className={styles[`btn_${variant}`] + ` ${className}`} type={type} {...props}>
			{children}
		</button>
	);
}
