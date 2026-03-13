import React from "react";
import styles from "./Card.module.scss";
import { CardProps } from "./Card.types";

export default function Card({ data, variant = "default", className = "" }: CardProps) {
	if (variant == "circle")
		return (
			<div className={styles[`card_${variant}`] + ` ${className}`}>
				<div className={styles.imgWrapper}>
					<img className={styles.img} src={data.image.url} alt={data.image.alt}></img>
				</div>
				<h3 className={styles.title}>{data.title}</h3>
			</div>
		);
}
