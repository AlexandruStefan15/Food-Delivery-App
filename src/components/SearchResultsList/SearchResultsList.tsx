import React from "react";
import styles from "./SearchResultsList.module.scss";
import { useSearchParams } from "react-router";

//data
import { useRestaurants } from "../../api/restaurants";

//comopnents
import ActivityIndicator from "../ActivityIndicator/ActivityIndicator";
import { NavLink } from "react-router";

interface SearchResultsListProps extends React.ComponentPropsWithRef<"div"> {
	searchValue: string;
	showOnly?: number | null;
	className?: string;
}

export function SearchResultsList({
	searchValue = "",
	showOnly = 6,
	className = "",
	...props
}: SearchResultsListProps) {
	const { restaurants, restaurantsAreLoading, restaurantsError } = useRestaurants();

	const filteredRestaurants = searchValue
		? restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(searchValue?.trim().toLowerCase()))
		: [];

	if (restaurantsError)
		return (
			<div className={styles.searchResultsContainer + ` ${className}`} {...props}>
				<p style={{ color: "red" }} className={styles.error}>
					Error: {restaurantsError?.message || "Failed to fetch"}
				</p>
			</div>
		);

	if (!searchValue) return null;

	if (filteredRestaurants.length === 0)
		return (
			<div className={styles.searchResultsContainer + ` ${className}`} {...props}>
				<p className={styles.cls}>No items found.</p>
			</div>
		);

	if (restaurantsAreLoading) {
		return (
			<div className={styles.searchResultsContainer + ` ${className}`} {...props}>
				<ActivityIndicator />
			</div>
		);
	}

	return (
		<div className={styles.searchResultsContainer + ` ${className}`} {...props}>
			{filteredRestaurants.length > 0 && (
				<ul className={styles.restaurantList}>
					{filteredRestaurants.map((restaurant, index) => {
						if (showOnly && index < showOnly)
							return (
								<li className={styles.listItem} key={restaurant.id}>
									{restaurant.name}
								</li>
							);
						else if (!showOnly)
							return (
								<li className={styles.listItem} key={restaurant.id}>
									{restaurant.name}
								</li>
							);
					})}
				</ul>
			)}
			{showOnly && filteredRestaurants.length > showOnly && (
				<NavLink className={styles.seeMoreLink} to="/restaurants">
					See more
				</NavLink>
			)}
		</div>
	);
}
