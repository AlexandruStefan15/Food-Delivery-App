import React, { ComponentPropsWithoutRef } from "react";
import styles from "./RestaurantList.module.scss";

//components
import RestaurantCard from "../RestaurantCard/RestaurantCard";

//types
import { Restaurant } from "../../types";

interface RestaurantListProps extends ComponentPropsWithoutRef<"ul"> {
	restaurants: Restaurant[];
}

export default function RestaurantList({ restaurants = [], className = "" }: RestaurantListProps) {
	return (
		<ul className={styles.restaurantList + ` ${className}`}>
			{restaurants.map((restaurant) => (
				<li className={styles.listItem} key={restaurant.id}>
					<RestaurantCard className={styles.restaurantCard} data={restaurant} />
				</li>
			))}
		</ul>
	);
}
