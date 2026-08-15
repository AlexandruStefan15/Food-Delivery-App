import React, { useEffect } from "react";
import styles from "./Cart.module.scss";

//api
import { useRestaurants } from "../../api/restaurants";

//helpers
import { getAverageTime } from "../../utils/helpers";

//store
import { useCartStore } from "../../store/cartStore";

//types
import type { CartItem } from "../../store/cartStore";
import type { Restaurant } from "../../types";

//icons
import { MdLocalShipping } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";

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
	restaurants: Restaurant[];
	deliveryTime: number;
	className?: string;
}

export default function Cart() {
	const cartItems = useCartStore((state) => state.items);
	const setIsCartBadgeActive = useCartStore((state) => state.setIsCartBadgeActive);
	const isCartBadgeActive = useCartStore((state) => state.isCartBadgeActive);
	const { restaurants } = useRestaurants();

	const restaurantIds = [...new Set(cartItems.map((item) => item.restaurant_id))];
	const deliveryTimeArr = restaurants
		.filter((restaurant) => restaurantIds.includes(restaurant.id))
		.map((restaurant) => restaurant.delivery_time);

	const getDeliveryTime = () => {
		let totalDeliveryTime = 0;

		deliveryTimeArr.forEach((item) => {
			totalDeliveryTime = totalDeliveryTime + getAverageTime(item);
		});

		return totalDeliveryTime / deliveryTimeArr.length;
	};

	useEffect(() => {
		setIsCartBadgeActive(false);
	}, [isCartBadgeActive]);

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<ItemList items={cartItems} />
				<OrderSummary items={cartItems} deliveryTime={getDeliveryTime()} restaurants={restaurants} />
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

const OrderSummary = ({ items, restaurants, deliveryTime = 0, className = "" }: OrderSummaryProps) => {
	const deliveryFee = useCartStore((state) => state.totalDeliveryFee(restaurants));

	const subtotalPrice = () => {
		return items.reduce((total, item) => total + item.price * item.quantity, 0);
	};
	const totalPrice: number = deliveryFee + subtotalPrice();

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
					<span className={styles.value}>${deliveryFee.toFixed(2)}</span>
				</div>
				<div className={styles.row}>
					<span className={styles.text}>Service Fee & Taxes</span>
					<span className={styles.value}>$0.00</span>
				</div>
			</div>
			<hr style={{ border: "none", borderTop: " 2px dashed #ccc" }} />
			<div className={styles.cartTotalWrapper}>
				<span className={styles.text}>Total</span>
				<span className={styles.value}>${totalPrice}</span>
			</div>
			<Button className={styles.checkoutBtn}>Proceed to Checkout</Button>
			<footer className={styles.footer}>
				<div className={styles.infoItem}>
					<MdLocalShipping className={styles.icon} />
					<span className={styles.text}>
						Estimated delivery time: <b>{deliveryTime} mins</b>
					</span>
				</div>
				<div className={styles.infoItem}>
					<MdOutlineSecurity className={styles.icon} />
					<span className={styles.text}> Secure payments with end-to-end encryption</span>
				</div>
			</footer>
		</div>
	);
};
