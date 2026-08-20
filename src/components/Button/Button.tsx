import React, { ComponentPropsWithoutRef, ElementType } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "default" | "muted" | "primary" | "secondary" | "tertiary" | "animated" | "transparent";

export type ButtonProps<T extends ElementType = "button"> = {
	as?: T;
	variant?: ButtonVariant;
} & ComponentPropsWithoutRef<T>;

export default function Button<T extends ElementType = "button">({
	className = "",
	children,
	variant = "default",
	as,
	type,
	...props
}: ButtonProps<T>) {
	const Element = as || "button";

	// Only pass `type` if rendering a native <button>
	const buttonType = Element === "button" ? type || "button" : undefined;

	return (
		<Element
			className={`${styles[`btn_${variant}`]} ${className}`}
			{...(buttonType ? { type: buttonType } : {})}
			{...(props as ComponentPropsWithoutRef<T>)}
		>
			{children}
		</Element>
	);
}
