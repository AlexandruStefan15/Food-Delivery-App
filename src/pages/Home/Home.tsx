import React from "react";
import styles from "./Home.module.scss";

//sections
import HeroBanner from "../../components/sections/HeroBanner/HeroBanner";
import Explore from "../../components/sections/Explore/Explore";
import HowItWorks from "../../components/sections/HowItWorks/HowItWorks";
import FeaturedRestaurants from "../../components/sections/PopularNearYou/FeaturedRestaurants";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Home() {
	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<HeroBanner />
				<Explore />
				<HowItWorks />
				<FeaturedRestaurants />
			</main>
			<Footer />
		</div>
	);
}
