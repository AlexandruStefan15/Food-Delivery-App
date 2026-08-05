import React from "react";
import styles from "./Cart.module.scss";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Cart() {
	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				{/* <ItemList/> */}
				{/* <OrderSummary/> */}
			</main>
			<Footer />
		</div>
	);
}
