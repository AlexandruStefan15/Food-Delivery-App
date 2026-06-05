import React from "react";
import styles from "./SearchResultsList.module.scss";
import { useSearchParams } from "react-router";

//data
import { useAllDishes } from "../../api/dishes";
import { useRestaurants } from "../../api/restaurants";

export function SearchResultsList() {
	const { data: dishes, isLoading: dishesAreLoading, error: dishesError } = useAllDishes();
	const { restaurants, restaurantsAreLoading, restaurantsError } = useRestaurants();

	const [searchParams] = useSearchParams();
	const searchValue = searchParams.get("query") || "";

	const filteredDishes = dishes.filter((dish) => dish.title.toLowerCase().includes(searchValue?.trim().toLowerCase()));
	const filteredRestaurants = restaurants.filter((restaurant) =>
		restaurant.name.toLowerCase().includes(searchValue?.trim().toLowerCase()),
	);

	return (
		<div className={styles.SearchResultsContainer}>
			{filteredDishes.length > 0 && (
				<ul className={styles.dishList}>
					{filteredDishes.map((dish) => (
						<li className={styles.listItem}>{dish.title}</li>
					))}
				</ul>
			)}
			{filteredRestaurants.length > 0 && (
				<ul className={styles.restaurantList}>
					{filteredRestaurants.map((restaurant) => (
						<li className={styles.listItem}>{restaurant.name}</li>
					))}
				</ul>
			)}
		</div>
	);
}
