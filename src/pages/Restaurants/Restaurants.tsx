import React from "react";
import styles from "./Restaurants.module.scss";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Restaurants() {
	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				{/* <Filters/> */}
				{/* <RestaurantList/> */}
			</main>
			<Footer />
		</div>
	);
}
