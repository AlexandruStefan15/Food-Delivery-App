import React from "react";
import styles from "./Textarea.module.scss";

export default function Textarea(props: React.ComponentPropsWithoutRef<"textarea">) {
	const { className = "", ...rest } = props;

	return (
		<textarea className={`${styles.textarea} ${className}`} name={props.name} id={props.id} {...rest}>
			{props.children}
		</textarea>
	);
}
