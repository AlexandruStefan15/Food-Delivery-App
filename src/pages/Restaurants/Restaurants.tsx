import React, { useEffect } from "react";
import styles from "./Restaurants.module.scss";
import { useLocation, useSearchParams } from "react-router";

//api
import { useRestaurants } from "../../api/restaurants";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Filters from "../../components/Filters/Filters";

export default function Restaurants() {
	const { restaurants, restaurantsAreLoading, restaurantsError } = useRestaurants();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		setSearchParams({});
	}, []);

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<Filters className={styles.filters} />
				<div className={styles.content}>
					<h1 className={styles.title}>Showing {restaurants.length} restaurants near downtown</h1>
					<h3 className={styles.subtitle}>Discover the best food in your area today.</h3>
					{/* <RestaurantList/> */}
				</div>
			</main>
			<Footer />
		</div>
	);
}
