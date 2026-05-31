import React from "react";
import styles from "./PopularNearYour.module.scss";
import { NavLink } from "react-router";

//api
import { useRestaurants } from "../../../api/restaurants";

//components
import RestaurantCard from "../../RestaurantCard/RestaurantCard";

export default function PopularNearYou() {
	const { restaurants } = useRestaurants();

	const selectedRestaurantsIds = [1, 3, 4];
	const displayedRestaurants = restaurants.filter((restaurant) =>
		selectedRestaurantsIds.includes(Number(restaurant.id)),
	);

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<header className={styles.header}>
					<h2 className={styles.title}>Popular near you</h2>
					<NavLink className={styles.viewAllLink} to="/restaurants">
						View All
					</NavLink>
				</header>
				<ul className={styles.restaurantList}>
					{displayedRestaurants.map((restaurant) => (
						<li className={styles.listItem} key={restaurant.id}>
							<RestaurantCard className={styles.card} data={restaurant} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
