import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.scss";
import { useNavigate } from "react-router";

//store
import { useCartStore } from "../../store/cartStore";

//types
import { CreateOrderInput } from "../../api/useOrders";

//configs
import { paymentOptionConfig } from "../../config/paymentOption";

//api
import { useRestaurants } from "../../api/restaurants";
import { useDeliveryAddresses } from "../../api/deliveryAddresses";
import { usePaymentOptions } from "../../api/paymentOptions";
import { useGetUserById } from "../../api/users";
import { useCreateOrder } from "../../api/useOrders";
import { usePaymentOptionById } from "../../api/paymentOptions";

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
	const clearCart = useCartStore((state) => state.clearCart);
	const { data: paymentOptions } = usePaymentOptions();
	const { mutate: createOrder, isPending } = useCreateOrder();
	const navigate = useNavigate();

	const [checkoutData, setCheckoutData] = useState<CheckoutState>({
		selectedAddressId: null,
		deliveryInstructions: "",
		selectedPaymentId: null,
	});

	const userDeliveryAddresses = deliveryAddresses?.filter((item) => item.user_id === user?.id);
	const selectedAddress = userDeliveryAddresses?.find((item) => item.id === checkoutData.selectedAddressId);
	const { data: selectedPayment } = usePaymentOptionById(checkoutData.selectedPaymentId);

	const isOrderValid = Boolean(user && selectedPayment && selectedAddress && cartItems.length > 0);

	function getCurrentTime(): string {
		const now = new Date();
		const hours = String(now.getHours()).padStart(2, "0");
		const minutes = String(now.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
	}

	const onPlaceOrder = () => {
		if (!user || !selectedPayment || !selectedAddress) return;

		const orderData: CreateOrderInput = {
			user_id: user.id,
			products: cartItems,
			date: new Date().toISOString().split("T")[0].split("-").reverse().join("-"),
			time: getCurrentTime(),
			address: selectedAddress.street_address,
			instructions: checkoutData.deliveryInstructions,
			payment_method: selectedPayment.name,
			status: "pending",
		};

		createOrder(orderData, {
			onSuccess: (createdOrder) => {
				alert("Order created successfully!");
				clearCart?.();
				navigate("/", { replace: true });

				setTimeout(
					async () => {
						try {
							const res = await fetch(`http://localhost:3001/orders/${createdOrder.id}`, {
								method: "PATCH",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									status: "delivered",
								}),
							});

							if (!res.ok) throw new Error("failed to update order");

							const data = await res.json();
						} catch (error) {
							console.error(error);
						}
					},
					20 * 60 * 1000,
				);
			},
		});
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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
												data={item}
												selectedAddress={checkoutData.selectedAddressId}
												setSelectedAddress={(value) =>
													setCheckoutData((prev) => ({ ...prev, selectedAddressId: value }))
												}
												onSelect={(id) => setCheckoutData((prev) => ({ ...prev, selectedAddressId: id }))}
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
									value={checkoutData.deliveryInstructions}
									onChange={(e) => setCheckoutData((prev) => ({ ...prev, deliveryInstructions: e.target.value }))}
									placeholder="Example: Gate code is 1234, please leave it at the front desk..."
									rows={7}
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
												<PaymentCard
													data={item}
													selectedMethod={checkoutData.selectedPaymentId}
													onSelect={(id) => setCheckoutData((prev) => ({ ...prev, selectedPaymentId: id }))}
													{...config}
												/>
											</li>
										);
									})}
								</ul>
							</Accordion.DetailsContent>
						</Accordion.Details>
					</Accordion.Item>
				</Accordion>
				<OrderSummary items={cartItems} restaurants={restaurants}>
					{cartItems.length > 0 && (
						<Button onClick={onPlaceOrder} variant="primary" disabled={!isOrderValid || isPending}>
							{isPending ? "Placing Order..." : "Place Order"}
						</Button>
					)}
				</OrderSummary>
			</main>
			<Footer />
		</div>
	);
}
