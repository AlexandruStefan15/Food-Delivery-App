import React from "react";
import styles from "./Restaurants.module.scss";
import { useSearchParams } from "react-router";

//api
import { useRestaurants } from "../../api/restaurants";
import { useAllDishes } from "../../api/dishes";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RestaurantFilters from "../../components/RestaurantFilters/RestaurantFilters";
import RestaurantList from "../../components/RestaurantList/RestaurantList";

type Dietary = "vegan" | "gluten_free" | "vegetarian";

const dietaryKeys: Dietary[] = ["vegan", "gluten_free", "vegetarian"];

export default function Restaurants() {
	const { restaurants = [], restaurantsAreLoading, restaurantsError } = useRestaurants();
	const { data: dishes = [], isLoading: dishesAreLoading, error: dishesError } = useAllDishes();
	const [searchParams] = useSearchParams();

	const selectedDietary = searchParams
		.getAll("dietary")
		.filter((item): item is Dietary => dietaryKeys.includes(item as Dietary));

	const selectedRating = searchParams.get("rating");
	const selectedMinPrice = searchParams.get("minPrice");
	const selectedMaxPrice = searchParams.get("maxPrice");
	const selectedDeliveryTime = searchParams.get("deliveryTime");

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

		return matchesDishFilters && matchesRating && matchesDeliveryTime;
	});

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<RestaurantFilters className={styles.filters} />
				<div className={styles.content}>
					<header className={styles.contentHeader}>
						<h1 className={styles.title}>Showing {filteredRestaurants.length} restaurants near downtown</h1>
						<h3 className={styles.subtitle}>Discover the best food in your area today.</h3>
					</header>
					<RestaurantList
						className={styles.restaurantList}
						wrapperClassname={styles.restaurantListWrapper}
						restaurants={filteredRestaurants}
						totalRestaurants={restaurants.length}
						showOnly={6}
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
}
