import React, { useState } from "react";
import styles from "./Checkout.module.scss";

//store
import { useCartStore } from "../../store/cartStore";

//configs
import { paymentOptionConfig } from "../../config/paymentOption";

//api
import { useRestaurants } from "../../api/restaurants";
import { useDeliveryAddresses } from "../../api/deliveryAddresses";
import { usePaymentOptions } from "../../api/paymentOptions";
import { useGetUserById } from "../../api/users";

//components
import Accordion from "../../components/Accordion/Accordion";
import DeliveryAddressCard from "../../components/DeliveryAddressCard/DeliveryAddressCard";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Button from "../../components/Button/Button";
import PaymentCard from "../../components/PaymentCard/PaymentCard";

export interface CheckoutState {
	selectedAddressId: number | null;
	deliveryInstructions: string;
	selectedPaymentId: number | null;
}

export default function Checkout() {
	const { restaurants } = useRestaurants();
	const { data: deliveryAddresses } = useDeliveryAddresses();
	const { data: user } = useGetUserById(1);
	const cartItems = useCartStore((state) => state.items);
	const { data: paymentOptions } = usePaymentOptions();

	const [checkoutData, setCheckoutData] = useState<CheckoutState>({
		selectedAddressId: null,
		deliveryInstructions: "",
		selectedPaymentId: null,
	});

	const userDeliveryAddresses = deliveryAddresses?.filter((item) => item.user_id === user?.id);

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<Accordion className={styles.checkoutAccordion} allowMultiple={true} defaultSelected={0}>
					<Accordion.Item className={styles.deliveryAddressItem}>
						<Accordion.Label>
							<div className={styles.titleWrapper}>
								<div className={styles.step}>1</div>
								<h3 className={styles.title}>Delivery Address</h3>
							</div>
						</Accordion.Label>
						<Accordion.Details>
							<Accordion.DetailsContent className={styles.detailsContent}>
								<p className={styles.text}>Choose where you want your food delivered.</p>
								<ul className={styles.deliveryAddressList}>
									{userDeliveryAddresses?.map((item) => (
										<li className={styles.listItem} key={item.id}>
											<DeliveryAddressCard
												selectedAddress={checkoutData.selectedAddressId}
												setSelectedAddress={(value) =>
													setCheckoutData((prev) => ({ ...prev, selectedAddressId: value }))
												}
												onSelect={(value) => setCheckoutData((prev) => ({ ...prev, selectedAddressId: value }))}
												data={item}
											/>
										</li>
									))}
								</ul>
							</Accordion.DetailsContent>
						</Accordion.Details>
					</Accordion.Item>
					<Accordion.Item className={styles.deliveryInstructionsItem}>
						<Accordion.Label>
							<div className={styles.titleWrapper}>
								<div className={styles.step}>2</div>
								<h3 className={styles.title}>Delivery Instructions</h3>
							</div>
						</Accordion.Label>
						<Accordion.Details>
							<Accordion.DetailsContent className={styles.detailsContent}>
								<textarea
									className={styles.textarea}
									name="delivery_instructions"
									id="delivery_instructions"
									placeholder="Example: Gate code is 1234, please leave it at the front desk..."
									rows={6}
								/>
							</Accordion.DetailsContent>
						</Accordion.Details>
					</Accordion.Item>
					<Accordion.Item className={styles.paymentMethodItem}>
						<Accordion.Label>
							<div className={styles.titleWrapper}>
								<div className={styles.step}>3</div>
								<h3 className={styles.title}>Payment Method</h3>
							</div>
						</Accordion.Label>
						<Accordion.Details>
							<Accordion.DetailsContent className={styles.detailsContent}>
								<ul className={styles.paymentOptionsList}>
									{paymentOptions?.map((item) => {
										const config = paymentOptionConfig[item.name.toLowerCase()];

										return (
											<li className={styles.listItem} key={item.id}>
												<PaymentCard data={item} {...config} />
											</li>
										);
									})}
								</ul>
							</Accordion.DetailsContent>
						</Accordion.Details>
					</Accordion.Item>
				</Accordion>
				<OrderSummary items={cartItems} restaurants={restaurants}>
					<Button variant="primary">Place Order</Button>
				</OrderSummary>
			</main>
			<Footer />
		</div>
	);
}
