import React from "react";
import styles from "./SearchResultsList.module.scss";
import { useSearchParams } from "react-router";

//data
import { useAllDishes } from "../../api/dishes";
import { useRestaurants } from "../../api/restaurants";

//comopnents
import ActivityIndicator from "../ActivityIndicator/ActivityIndicator";

interface SearchResultsListProps {
	searchValue: string;
	className?: string; // The "?" means it is optional since you defaulted it to ""
}

export function SearchResultsList({ searchValue, className = "" }: SearchResultsListProps) {
	const { data: dishes, isLoading: dishesAreLoading, error: dishesError } = useAllDishes();
	const { restaurants, restaurantsAreLoading, restaurantsError } = useRestaurants();

	const [searchParams] = useSearchParams();
	const currentSearchValue = searchValue || searchParams.get("query") || "";

	const filteredDishes = currentSearchValue
		? dishes.filter((dish) => dish.title.toLowerCase().includes(currentSearchValue?.trim().toLowerCase()))
		: [];
	const filteredRestaurants = currentSearchValue
		? restaurants.filter((restaurant) =>
				restaurant.name.toLowerCase().includes(currentSearchValue?.trim().toLowerCase()),
			)
		: [];

	if (dishesError || restaurantsError)
		return (
			<p style={{ color: "red" }} className={styles.error}>
				Error: {dishesError?.message || restaurantsError?.message || "Failed to fetch"}
			</p>
		);

	if ((filteredDishes.length === 0 && filteredRestaurants.length === 0) || !currentSearchValue) return null;

	if (dishesAreLoading || restaurantsAreLoading) {
		return (
			<div className={styles.searchResultsContainer + ` ${className}`}>
				<ActivityIndicator />
			</div>
		);
	}

	return (
		<div className={styles.searchResultsContainer + ` ${className}`}>
			{filteredDishes.length > 0 && (
				<ul className={styles.dishList}>
					{filteredDishes.map((dish) => (
						<li className={styles.listItem} key={dish.id}>
							{dish.title}
						</li>
					))}
				</ul>
			)}
			{filteredRestaurants.length > 0 && (
				<ul className={styles.restaurantList}>
					{filteredRestaurants.map((restaurant) => (
						<li className={styles.listItem} key={restaurant.id}>
							{restaurant.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
