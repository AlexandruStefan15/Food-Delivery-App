import React from "react";
import styles from "./Checkout.module.scss";

//components
import Accordion from "../../components/Accordion/Accordion";
import DeliveryAddressCard from "../../components/DeliveryAddressCard/DeliveryAddressCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Checkout() {
	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}></main>
			<Footer />
		</div>
	);
}
