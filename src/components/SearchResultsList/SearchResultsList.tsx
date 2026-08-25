import React, { useState, useEffect } from "react";
import styles from "./SearchResultsList.module.scss";
import { NavLink, useLocation } from "react-router";

//types
import { RestaurantCardProps } from "../RestaurantCard/RestaurantCard.types";

//data
import { useRestaurants } from "../../api/restaurants";

//comopnents
import ActivityIndicator from "../ActivityIndicator/ActivityIndicator";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import Button from "../Button/Button";

interface SearchResultsListProps extends React.ComponentPropsWithRef<"div"> {
	searchValue: string;
	showOnly?: number | null;
	showSeeAllBtn?: boolean;
	showSeeMoreBtn?: boolean;
	className?: string;
	restaurantCardProps?: Omit<RestaurantCardProps, "data">;
}

export default function SearchResultsList({
	searchValue = "",
	showOnly = 5,
	showSeeAllBtn = true,
	showSeeMoreBtn = false,
	className = "",
	restaurantCardProps,
	...props
}: SearchResultsListProps) {
	const [itemsShowed, setItemsShowed] = useState<number | null>(showOnly);
	const { restaurants, restaurantsAreLoading, restaurantsError } = useRestaurants();

	const filteredRestaurants = searchValue
		? restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(searchValue?.trim().toLowerCase()))
		: [];

	useEffect(() => {
		setItemsShowed(showOnly);
	}, [showOnly]);

	useEffect(() => {
		setItemsShowed(showOnly);
	}, [searchValue]);

	if (restaurantsError)
		return (
			<div className={styles.searchResultsContainer + ` ${className}`} {...props}>
				<p style={{ color: "red" }} className={styles.error}>
					Error: {restaurantsError?.message || "Failed to fetch"}
				</p>
			</div>
		);

	if (restaurantsAreLoading) {
		return (
			<div className={styles.searchResultsContainer + ` ${className}`} {...props}>
				<ActivityIndicator />
			</div>
		);
	}

	if (!searchValue) return null;

	if (filteredRestaurants.length === 0)
		return (
			<div className={styles.searchResultsContainer + ` ${className}`} {...props}>
				<p className={styles.cls}>No items found.</p>
			</div>
		);

	return (
		<div className={styles.searchResultsContainer + ` ${className}`} {...props}>
			{filteredRestaurants.length > 0 && (
				<ul className={styles.restaurantList}>
					{filteredRestaurants.map((restaurant, index) => {
						if (itemsShowed && index < itemsShowed)
							return (
								<li className={styles.listItem} key={restaurant.id}>
									<NavLink to={`/restaurants/${restaurant.id}`}>
										<RestaurantCard
											variant="search"
											data={restaurant}
											{...restaurantCardProps}
											className={styles.restaurantCard + ` ${restaurantCardProps?.className}`}
										/>
									</NavLink>
								</li>
							);
						else if (!itemsShowed)
							return (
								<li className={styles.listItem} key={restaurant.id}>
									<NavLink to={`/restaurants/${restaurant.id}`}>
										<RestaurantCard
											variant="search"
											data={restaurant}
											{...restaurantCardProps}
											className={styles.restaurantCard + ` ${restaurantCardProps?.className}`}
										/>
									</NavLink>
								</li>
							);
					})}
				</ul>
			)}

			{showSeeAllBtn && itemsShowed && filteredRestaurants.length > itemsShowed && (
				<NavLink className={styles.seeAllLink} to={`/restaurants?searchValue=${searchValue}`}>
					See all results
				</NavLink>
			)}

			{showSeeMoreBtn && itemsShowed && filteredRestaurants.length > itemsShowed && (
				<Button
					className={styles.seeMoreBtn}
					onClick={() =>
						setItemsShowed((prev) => {
							return (prev ?? 0) + itemsShowed;
						})
					}
				>
					See more
				</Button>
			)}
		</div>
	);
}
