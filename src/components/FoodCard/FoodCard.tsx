import React from "react";
import styles from "./FoodCard.module.scss";
import { FoodCardProps } from "./FoodCard.types";

export default function FoodCard({ data, variant = "circle", className = "" }: FoodCardProps) {
	return (
		<div className={styles[`foodCard_${variant}`] + ` ${className}`}>
			<div className={styles.imageWrapper}>
				<img className={styles.img} src={data.image.url} alt={data.image.alt}></img>
			</div>
			<h3 className={styles.title}>{data.title}</h3>
		</div>
	);
}
