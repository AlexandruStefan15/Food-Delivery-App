import React from "react";
import styles from "./Card.module.scss";
import { CardProps } from "./Card.types";

//icons
import { BsClock } from "react-icons/bs";
import { MdOutlineDeliveryDining } from "react-icons/md";

export default function Card({ data, variant = "default", className = "", ...props }: CardProps) {
	return (
		<div className={styles[`card_${variant}`] + ` ${className}`} {...props}>
			<header className={styles.header}>
				{data.image && (
					<div className={styles.imgWrapper}>
						<img className={styles.img} src={data.image.url} alt={data.image.alt}></img>
					</div>
				)}
			</header>
			<div className={styles.body}>
				<h3 className={styles.title}>{data.title}</h3>
				{data.subtitle && <h4 className={styles.subtitle}>{data.subtitle}</h4>}
			</div>
			<footer className={styles.footer}>
				{data.time && (
					<span className={styles.time}>
						<BsClock />
						<span>{data.time}</span>
					</span>
				)}
				{data.deliveryFee !== undefined && (
					<span className={styles.deliveryFee}>
						<MdOutlineDeliveryDining />
						{data.deliveryFee > 0 ? `$${data.deliveryFee} delivery` : "Free delivery"}
					</span>
				)}
			</footer>
		</div>
	);
}
