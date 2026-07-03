import React from "react";
import styles from "./RestaurantCard.module.scss";

//icons
import { MdAccessTime } from "react-icons/md";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { IoMdStar } from "react-icons/io";

//types
import { RestaurantCardProps, RatingBadgeProps } from "./RestaurantCard.types";

//components
import Card from "../Card/Card";

export default function RestaurantCard({ data, className = "", variant = "default", ...props }: RestaurantCardProps) {
	return (
		<Card className={`${styles[`card_${variant}`]} ${className}`} {...props}>
			<header className={styles.header}>
				{data.card_image && (
					<img className={styles.img} src={data.card_image} fetchPriority="high" alt="restaurant card image" />
				)}
			</header>
			<div className={styles.body}>
				<div className={styles.titleWrapper}>
					<h3 className={styles.title}>{data.name}</h3>
					{data.rating && <RatingBadge className={styles.ratingBadge} rating={data.rating} />}
				</div>
				{data.main_cuisine && <Card.Subtitle className={styles.subtitle}>{data.main_cuisine}</Card.Subtitle>}
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

function RatingBadge({ rating, icon, className = "" }: RatingBadgeProps) {
	const colorScheme = (rating: number) => {
		switch (true) {
			case rating > 4:
				return { color: "#15803d", background: "#dcfce7" };

			case 3.5 <= rating && rating <= 4.5:
				return { color: "#e79500", background: "#ffaa0037" };

			default:
				return { color: "#d70000", background: "#c800002b" };
		}
	};

	return (
		<span
			className={styles.ratingBadge + ` ${className}`}
			style={{ color: colorScheme(rating).color, backgroundColor: colorScheme(rating).background }}
		>
			{icon ? icon : <IoMdStar size={15} />}
			<span className={styles.text}>{rating}</span>
		</span>
	);
}
