import React from "react";
import styles from "./Card.module.scss";

export default function Card({ children, className = "", ...props }: React.ComponentPropsWithoutRef<"div">) {
	return <div>{children}</div>;
}

Card.Title = function CardTitle({ className = "", children, ...props }: React.ComponentPropsWithoutRef<"h2">) {
	return (
		<h2 className={styles.title + ` ${className}`} {...props}>
			{children}
		</h2>
	);
};

Card.Subtitle = function CardSubtitle({ className = "", children, ...props }: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div className={styles.cls + ` ${className}`} {...props}>
			{children}
		</div>
	);
};
