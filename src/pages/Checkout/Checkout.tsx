import React from "react";
import styles from "./Checkout.module.scss";

//store
import { useCartStore } from "../../store/cartStore";

//api
import { useRestaurants } from "../../api/restaurants";

//components
import Accordion from "../../components/Accordion/Accordion";
import DeliveryAddressCard from "../../components/DeliveryAddressCard/DeliveryAddressCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { NavLink } from "react-router";
import Button from "../../components/Button/Button";

export default function Checkout() {
	const { restaurants } = useRestaurants();
	const cartItems = useCartStore((state) => state.items);

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<Accordion>
					<Accordion.Item>
						<Accordion.Label>Delivery Address</Accordion.Label>
						<Accordion.Details>
							<p className={styles.cls}>Choose where you want your food delivered.</p>
							<ul className={styles.deliveryAddressList}>
								<li className={styles.cls}></li>
								<li className={styles.cls}></li>
							</ul>
						</Accordion.Details>
					</Accordion.Item>
					<Accordion.Item></Accordion.Item>
					<Accordion.Item></Accordion.Item>
				</Accordion>
				<OrderSummary items={cartItems} restaurants={restaurants}>
					<Button variant="primary">Place Order</Button>
				</OrderSummary>
			</main>
			<Footer />
		</div>
	);
}
