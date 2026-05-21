import React from "react";
import styles from "./PopularNearYour.module.scss";
import { NavLink } from "react-router";

//api
import { useRestaurants } from "../../../api/restaurants";

//components
import Card from "../../Card/Card";

export default function PopularNearYou() {
	const { restaurants } = useRestaurants();

	const selectedRestaurantsIds = [1, 3, 4];
	const displayedRestaurants = restaurants.filter((restaurant) => selectedRestaurantsIds.includes(restaurant.id));

	return (
		<section className={styles.section}>
			<div className={styles.section_container}>
				<header className={styles.header}>
					<h2 className={styles.title}>Popular near you</h2>
					<NavLink to="/restaurants">see more</NavLink>
				</header>
				<div className={styles.restaurants_container}>
					{displayedRestaurants.map((restaurant) => (
						<Card data={restaurant} variant="featured" key={restaurant.id} />
					))}
				</div>
			</div>
		</section>
	);
}
