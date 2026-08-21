import React from "react";
import styles from "./Checkout.module.scss";

//store
import { useCartStore } from "../../store/cartStore";

//api
import { useRestaurants } from "../../api/restaurants";
import { useDeliveryAddresses } from "../../api/deliveryAddresses";

//components
import Accordion from "../../components/Accordion/Accordion";
import DeliveryAddressCard from "../../components/DeliveryAddressCard/DeliveryAddressCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Button from "../../components/Button/Button";
import { useGetUserById } from "../../api/users";

export default function Checkout() {
	const { restaurants } = useRestaurants();
	const { data: deliveryAddresses } = useDeliveryAddresses();
	const { data: user } = useGetUserById(1);
	const cartItems = useCartStore((state) => state.items);

	const userDeliveryAddresses = deliveryAddresses?.filter((item) => item.user_id === user?.id);

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
								{userDeliveryAddresses?.map((item) => (
									<li className={styles.listItem} key={item.id}>
										<DeliveryAddressCard data={item} />
									</li>
								))}
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
