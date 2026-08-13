import React from "react";
import styles from "./Cart.module.scss";

//api
import { useRestaurants } from "../../api/restaurants";

//store
import { useCartStore } from "../../store/cartStore";

//types
import type { CartItem } from "../../store/cartStore";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DishCard from "../../components/DishCard/DishCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Button from "../../components/Button/Button";

interface ItemListProps {
	items: CartItem[];
	className?: string;
}

interface OrderSummaryProps {
	items: CartItem[];
	className?: string;
}

export default function Cart() {
	const cartItems = useCartStore((state) => state.items);

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<ItemList items={cartItems} />
				<OrderSummary items={cartItems} />
			</main>
			<Footer />
		</div>
	);
}

const ItemList = function ({ items, className = "" }: ItemListProps) {
	return (
		<div className={styles.itemListWrapper + ` ${className}`}>
			<h2 className={styles.title}>
				Your Cart <span className={styles.itemsCount}>({items.length === 1 ? `1 item` : `${items.length} items`})</span>
			</h2>
			<ul className={styles.list}>
				{items.map((item) => (
					<li className={styles.listItem} key={item.id}>
						<DishCard variant="cart" data={item} />
					</li>
				))}
			</ul>
		</div>
	);
};

const OrderSummary = ({ items, className = "" }: OrderSummaryProps) => {
	const { restaurants } = useRestaurants();
	const deliveryFee = useCartStore((state) => state.totalDeliveryFee(restaurants));

	const subtotalPrice = () => {
		return items.reduce((total, item) => total + item.price, 0);
	};
	const totalPrice = deliveryFee + subtotalPrice();

	return (
		<div className={styles.orderSummary + ` ${className}`}>
			<h2 className={styles.title}>Order Summary</h2>
			<div className={styles.promo}>
				<h3 className={styles.title}>Promo code</h3>
				<SearchBar
					className={styles.input}
					wrapperClassname={styles.searchBarWrapper}
					placeholder="Enter code"
					searchButtonContent="Apply"
					searchButtonProps={{ variant: "animated", className: styles.searchBtn }}
				/>
			</div>
			<div className={styles.details}>
				<div className={styles.row}>
					<span className={styles.text}>Subtotal</span>
					<span className={styles.value}>${subtotalPrice()}</span>
				</div>
				<div className={styles.row}>
					<span className={styles.text}>Delivery Fee</span>
					<span className={styles.value}>${deliveryFee}</span>
				</div>
				<div className={styles.row}>
					<span className={styles.text}>Service Fee & Taxes</span>
					<span className={styles.value}>$0.00</span>
				</div>
			</div>
			<hr style={{ border: "none", borderTop: " 2px dashed #ccc" }} />
			<div className={styles.cartTotal}>
				<span className={styles.text}>Total</span>
				<span className={styles.value}>${totalPrice}</span>
			</div>

			<Button className={styles.checkoutBtn}>Proceed to Checkout</Button>
			<footer className={styles.footer}>
				<div className={styles.infoItem}>Estimated delivery time: 25 - 35 mins</div>
				<div className={styles.infoItem}>Secure payments with end-to-end encryption</div>
			</footer>
		</div>
	);
};
