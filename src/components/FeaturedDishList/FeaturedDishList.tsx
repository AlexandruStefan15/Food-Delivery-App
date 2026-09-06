import React from "react";
import styles from "./FeaturedDishList.module.scss";

//types
import { FeaturedDishListProps } from "./FeaturedDishList.types";

//components
import DishCard from "../DishCard/DishCard";

export default function FeaturedDishList({
	title = "Special offers",
	dishes = [],
	className = "",
}: FeaturedDishListProps) {
	return (
		<div className={styles.listWrapper}>
			<h2 className={styles.title}>{title}</h2>
			<ul className={styles.dishList + ` ${className}`}>
				{dishes.map((dish) => (
					<li className={styles.listItem}>
						<DishCard data={dish} variant="featured" />
					</li>
				))}
			</ul>
		</div>
	);
}
