import React from "react";
import styles from "./RestaurantCard.module.scss";

//icons
import { MdAccessTime } from "react-icons/md";
import { MdOutlineDeliveryDining } from "react-icons/md";

//types
import { RestaurantCardProps } from "./RestaurantCard.types";

//components
import Card from "../Card/Card";

export default function RestaurantCard({ data, className = "", ...props }: RestaurantCardProps) {
	return (
		<Card className={`${styles.card} ${className}`} {...props}>
			<header className={styles.header}>
				{data.card_image && <img className={styles.img} src={data.card_image} alt="restaurant card image" />}
			</header>
			<div className={styles.body}>
				<h3 className={styles.title}>{data.name}</h3>
				{data.cuisine && <Card.Subtitle className={styles.subtitle}>{data.cuisine}</Card.Subtitle>}
				<div className={styles.metadata}>
					{data.delivery_time && (
						<div className={styles.metaItem}>
							<MdAccessTime size={17} color="#6b7280" />
							<Card.Text>{data.delivery_time}</Card.Text>
						</div>
					)}
					{data.delivery_fee !== undefined && data.delivery_fee !== null && (
						<div className={styles.metaItem}>
							<MdOutlineDeliveryDining size={18} color="#6b7280" />
							<Card.Text>{data.delivery_fee > 0 ? `$${data.delivery_fee} delivery` : "Free delivery"}</Card.Text>
						</div>
					)}
				</div>
			</div>
		</Card>
	);
}
