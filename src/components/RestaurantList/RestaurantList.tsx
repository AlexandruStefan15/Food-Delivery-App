import React, { ComponentPropsWithoutRef } from "react";
import styles from "./RestaurantList.module.scss";

//components
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import Button from "../Button/Button";

//types
import { Restaurant } from "../../types";

interface RestaurantListProps extends ComponentPropsWithoutRef<"ul"> {
	restaurants: Restaurant[];
	showOnly: number;
}

export default function RestaurantList({ restaurants = [], className = "", showOnly = 6 }: RestaurantListProps) {
	return (
		<div className={styles.restaurantListContainer}>
			<ul className={styles.restaurantList + ` ${className}`}>
				{restaurants.map(
					(restaurant, i) =>
						i < showOnly && (
							<li className={styles.listItem} key={restaurant.id}>
								<RestaurantCard className={styles.restaurantCard} data={restaurant} />
							</li>
						),
				)}
			</ul>
			{showOnly && <Button className={styles.seeMoreBtn}>Load more restaurants</Button>}
		</div>
	);
}
