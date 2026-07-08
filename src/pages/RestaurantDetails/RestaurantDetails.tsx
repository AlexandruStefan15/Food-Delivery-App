import React from "react";
import styles from "./RestaurantDetails.module.scss";
import { useParams } from "react-router";

//api
import { useRestaurantById } from "../../api/restaurants";
import { useDishesByRestaurant } from "../../api/dishes";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function RestaurantDetails() {
	const { restaurantId } = useParams();
	const { restaurant = {}, restaurantIsLoading, restaurantError } = useRestaurantById(restaurantId);
	const { dishes = [], dishesAreLoading, dishesError } = useDishesByRestaurant(Number(restaurantId));

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<div className={styles.banner}>
					<img className={styles.backgroundImg} src={""} alt=""></img>
					<h2 className={styles.title}></h2>
					<div className={styles.info}></div>
				</div>
				<div className={styles.content}></div>
			</main>
			<Footer />
		</div>
	);
}
