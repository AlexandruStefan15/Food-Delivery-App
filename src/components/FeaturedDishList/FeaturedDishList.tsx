import React, { use } from "react";
import styles from "./FeaturedDishList.module.scss";
import { NavLink, useParams } from "react-router";

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
						<NavLink style={{ display: "block" }} to={`/restaurants/${dish.restaurant_id}/dishes/${dish.id}`}>
							<DishCard data={dish} variant="featured" />
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}
