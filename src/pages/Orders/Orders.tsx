import React from "react";
import styles from "./Orders.module.scss";

//api
import { useOrdersByUserId } from "../../api/useOrders";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import OrderCard from "../../components/OrderCard/OrderCard";
import Accordion from "../../components/Accordion/Accordion";

export default function Orders() {
	const { data: orders = [], isLoading: ordersAreLoading, error: ordersError } = useOrdersByUserId(1);

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<h1 className={styles.title}>Your Orders:</h1>

				<Accordion className={styles.orderList}>
					{orders.map((order) => (
						<li className={styles.orderListItem} key={order.id}>
							<OrderCard orderData={order} />
						</li>
					))}
				</Accordion>
			</main>
			<Footer />
		</div>
	);
}
