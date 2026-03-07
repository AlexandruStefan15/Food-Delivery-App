import React from "react";
import styles from "./Home.module.scss";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeroBanner from "../../components/sections/HeroBanner/HeroBanner";

export default function Home() {
	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<HeroBanner />
			</main>
			<Footer />
		</div>
	);
}
