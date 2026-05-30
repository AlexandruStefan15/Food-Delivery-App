import React from "react";
import styles from "./Card.module.scss";

export default function Card({ children, className = "", ...props }: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div className={styles.card + ` ${className}`} {...props}>
			{children}
		</div>
	);
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
		<div className={styles.subtitle + ` ${className}`} {...props}>
			{children}
		</div>
	);
};

Card.Text = function CardText({ className = "", children, ...props }: React.ComponentPropsWithoutRef<"span">) {
	return (
		<span className={styles.text + ` ${className}`} {...props}>
			{children}
		</span>
	);
};

Card.Paragraph = function CardParagraph({ className = "", children, ...props }: React.ComponentPropsWithoutRef<"p">) {
	return (
		<p className={styles.paragraph + ` ${className}`} {...props}>
			{children}
		</p>
	);
};
