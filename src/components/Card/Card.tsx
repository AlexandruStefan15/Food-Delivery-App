import React from "react";
import styles from "./Card.module.scss";
import { CardProps } from "./Card.types";

import { BsClock } from "react-icons/bs";
import { MdOutlineDeliveryDining } from "react-icons/md";

export default function Card(props: CardProps) {
	if (props.variant === "basic") {
		const { data, className = "", variant, ...divProps } = props;

		return (
			<div className={`${styles.card_basic} ${className}`} {...divProps}>
				{data.image && (
					<div className={styles.imgWrapper}>
						<img className={styles.img} src={data.image.url} alt={data.image.alt} />
					</div>
				)}

				<div className={styles.content}>
					<h3 className={styles.title}>{data.title}</h3>
				</div>
			</div>
		);
	}

	if (props.variant === "featured") {
		const { data, className = "", variant, ...divProps } = props;

		return (
			<div className={`${styles.card_featured} ${className}`} {...divProps}>
				<header className={styles.header}>
					{data.card_image && <img className={styles.img} src={data.card_image} alt="restaurant card image" />}
				</header>

				<div className={styles.body}>
					<h3 className={styles.title}>{data.name}</h3>

					{data.cuisine && <h4 className={styles.subtitle}>{data.cuisine}</h4>}

					<div className={styles.metadata}>
						{data.delivery_time && (
							<span className={styles.metaItem}>
								<BsClock />
								<span>{data.delivery_time}</span>
							</span>
						)}

						{data.delivery_fee !== undefined && data.delivery_fee !== null && (
							<span className={styles.metaItem}>
								<MdOutlineDeliveryDining />
								<span>{data.delivery_fee > 0 ? `$${data.delivery_fee} delivery` : "Free delivery"}</span>
							</span>
						)}
					</div>
				</div>
			</div>
		);
	}

	const { data, className = "", variant, ...divProps } = props;

	return (
		<div className={`${styles.card_default} ${className}`} {...divProps}>
			<header className={styles.header}>
				{data.icon && (
					<div className={styles.iconWrapper}>
						{data.icon.type === "component" ? (
							<data.icon.component className={styles.icon} />
						) : (
							<img src={data.icon.src} alt={data.icon.alt} />
						)}
					</div>
				)}
			</header>

			<div className={styles.body}>
				<h3 className={styles.title}>{data.title}</h3>

				{data.subtitle && <h4 className={styles.subtitle}>{data.subtitle}</h4>}
			</div>
		</div>
	);
}
