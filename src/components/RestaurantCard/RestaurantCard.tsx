import React from "react";
import styles from "./RestaurantCard.module.scss";

//icons
import { BsClock } from "react-icons/bs";
import { MdOutlineDeliveryDining } from "react-icons/md";

//types
import { RestaurantCardProps } from "./RestaurantCard.types";

export default function RestaurantCard({ data, className = "", ...props }: RestaurantCardProps) {
	return (
		<div className={`${styles.card} ${className}`} {...props}>
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
