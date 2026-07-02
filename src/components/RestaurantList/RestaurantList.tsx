import React, { ComponentPropsWithoutRef, useState, useEffect } from "react";
import styles from "./RestaurantList.module.scss";
import { NavLink } from "react-router";

//components
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import RangeInput from "../RangeInput/RangeInput";
import Button from "../Button/Button";

//types
import { Restaurant } from "../../types";

interface RestaurantListProps extends ComponentPropsWithoutRef<"ul"> {
	restaurants: Restaurant[];
	showOnly?: number;
}

export default function RestaurantList({ restaurants = [], className = "", showOnly = 6 }: RestaurantListProps) {
	const [showedRestaurants, setShowedRestaurants] = useState<number>(
		showOnly < restaurants.length ? showOnly : restaurants.length,
	);

	useEffect(() => {
		setShowedRestaurants(showOnly < restaurants.length ? showOnly : restaurants.length);
	}, [restaurants, showOnly]);

	return (
		<div className={styles.restaurantListContainer}>
			<ul className={styles.restaurantList + ` ${className}`}>
				{restaurants.map(
					(restaurant, i) =>
						i < showedRestaurants && (
							<li className={styles.listItem} key={restaurant.id}>
								<NavLink to={`/restaurants/${restaurant.id}`}>
									<RestaurantCard className={styles.restaurantCard} data={restaurant} />
								</NavLink>
							</li>
						),
				)}
			</ul>
			<footer className={styles.footer}>
				<div className={styles.counterWrapper}>
					<p className={styles.text}>
						Showing {showedRestaurants} of {restaurants.length} restaurants{" "}
					</p>
					<RangeInput
						className={styles.rangeInput}
						value={showedRestaurants}
						min={0}
						max={restaurants.length}
						showLabelsElement={false}
						showValueBubble={false}
					/>
				</div>
				{showOnly && showedRestaurants < restaurants.length && (
					<Button
						className={styles.seeMoreBtn}
						onClick={() => {
							setShowedRestaurants((prev) => {
								if (prev + showOnly <= restaurants.length) return prev + showOnly;
								else return prev + (restaurants.length - prev);
							});
						}}
					>
						Load more restaurants
					</Button>
				)}
			</footer>
		</div>
	);
}
