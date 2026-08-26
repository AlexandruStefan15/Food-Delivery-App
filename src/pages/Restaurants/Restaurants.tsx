import React, { useState, useEffect } from "react";
import styles from "./Restaurants.module.scss";
import { useSearchParams } from "react-router";

//api
import { useRestaurants } from "../../api/restaurants";
import { useAllDishes } from "../../api/dishes";
import { useFoodCategories } from "../../api/foodCategories";

//icons
import { LuSlidersHorizontal } from "react-icons/lu";

//types
import { Dietary } from "../../types";

//hooks
import { useIsTabletLarge } from "../../hooks/useIsTabletLarge";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RestaurantFilters from "../../components/RestaurantFilters/RestaurantFilters";
import RestaurantList from "../../components/RestaurantList/RestaurantList";
import SearchBar from "../../components/SearchBar/SearchBar";
import Sidebar from "../../components/Sidebar/Sidebar";

const dietaryKeys: (keyof Dietary)[] = ["vegan", "gluten_free", "vegetarian"];

const popularFoodCategories = ["pizza", "burgers", "sushi", "vegan", "pasta", "fish"];

export default function Restaurants() {
	const { restaurants = [], restaurantsAreLoading, restaurantsError } = useRestaurants();
	const { data: dishes = [], isLoading: dishesAreLoading, error: dishesError } = useAllDishes();
	const { foodCategories = [], foodCategoriesAreLoading, foodCategoriesError } = useFoodCategories();
	const [searchParams, setSearchParams] = useSearchParams();
	const isTabletLarge = useIsTabletLarge();
	const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

	const filtersFoodCategories = foodCategories.filter((item) =>
		popularFoodCategories.includes(item.title.toLowerCase()),
	);

	const selectedDietary = searchParams
		.getAll("dietary")
		.filter((item): item is keyof Dietary => dietaryKeys.includes(item as keyof Dietary));

	const selectedCategories = searchParams.getAll("category");
	const selectedRating = searchParams.get("rating");
	const selectedMinPrice = searchParams.get("minPrice");
	const selectedMaxPrice = searchParams.get("maxPrice");
	const selectedDeliveryTime = searchParams.get("deliveryTime");
	const searchValue = searchParams.get("searchValue");

	const ratingFilter = selectedRating ? Number(selectedRating) : null;
	const minPriceFilter = selectedMinPrice ? Number(selectedMinPrice) : null;
	const maxPriceFilter = selectedMaxPrice ? Number(selectedMaxPrice) : null;
	const deliveryTimeFilter = selectedDeliveryTime ? Number(selectedDeliveryTime) : null;

	const hasDishFilters = selectedDietary.length > 0 || minPriceFilter !== null || maxPriceFilter !== null;

	const matchingRestaurantIds = new Set(
		dishes
			.filter((dish) => {
				const matchesDietary = selectedDietary.length === 0 || selectedDietary.every((item) => dish.dietary[item]);
				const matchesMinPrice = minPriceFilter === null || dish.price >= minPriceFilter;
				const matchesMaxPrice = maxPriceFilter === null || dish.price <= maxPriceFilter;

				return matchesDietary && matchesMinPrice && matchesMaxPrice;
			})
			.map((dish) => dish.restaurant_id),
	);

	const filteredRestaurants = restaurants.filter((restaurant) => {
		const matchesDishFilters = !hasDishFilters || matchingRestaurantIds.has(restaurant.id);
		const matchesRating = ratingFilter === null || restaurant.rating >= ratingFilter;
		const matchesDeliveryTime =
			deliveryTimeFilter === null || Number.parseInt(restaurant.delivery_time) <= deliveryTimeFilter;

		const matchesCategory =
			selectedCategories.length === 0 ||
			foodCategories.some(
				({ id, title }) => selectedCategories.includes(title) && restaurant.food_categories_ids.includes(id),
			);

		const matchesSearchValue =
			!searchValue || restaurant.name.toLocaleLowerCase().includes(searchValue.trim().toLowerCase());

		return matchesDishFilters && matchesRating && matchesDeliveryTime && matchesCategory && matchesSearchValue;
	});

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				{!isTabletLarge && <RestaurantFilters className={styles.filters} categories={filtersFoodCategories} />}
				<div className={styles.content}>
					<header className={styles.contentHeader}>
						<h1 className={styles.title}>
							{searchValue
								? `Found ${filteredRestaurants.length} ${filteredRestaurants.length === 1 ? "restaurant" : "restaurants"}`
								: `Showing ${filteredRestaurants.length} restaurants near downtown`}
						</h1>
						<h3 className={styles.subtitle}>Discover the best food in your area today.</h3>
					</header>
					<div className={styles.searchBarContainer}>
						<SearchBar
							wrapperClassname={styles.searchBarWrapper}
							value={searchParams.get("searchValue") || ""}
							onChange={(value) =>
								setSearchParams((prev) => {
									if (!value) prev.delete("searchValue");
									else prev.set("searchValue", value);
									return prev;
								})
							}
						/>

						{isTabletLarge && (
							<button className={styles.filtersBtn} onClick={() => setIsFilterSidebarOpen(true)}>
								<LuSlidersHorizontal className={styles.icon} />
							</button>
						)}
					</div>

					<RestaurantList
						className={styles.restaurantList}
						wrapperClassname={styles.restaurantListWrapper}
						restaurants={filteredRestaurants}
						totalRestaurants={restaurants.length}
						showOnly={6}
					/>
				</div>

				<Sidebar
					className={styles.filterSidebar}
					isOpen={isFilterSidebarOpen}
					onClose={() => setIsFilterSidebarOpen(false)}
				>
					<RestaurantFilters className={styles.filters} categories={filtersFoodCategories} />
				</Sidebar>
			</main>
			<Footer />
		</div>
	);
}
