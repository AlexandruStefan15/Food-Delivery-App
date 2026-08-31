import React from "react";
import styles from "./Orders.module.scss";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Orders() {
	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>orders page</main>
			<Footer />
		</div>
	);
}
