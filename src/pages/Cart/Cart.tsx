import React, { useEffect } from "react";
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
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Button from "../../components/Button/Button";
import { NavLink } from "react-router";

interface ItemListProps {
	items: CartItem[];
	className?: string;
}

export default function Cart() {
	const cartItems = useCartStore((state) => state.items);
	const setIsCartBadgeActive = useCartStore((state) => state.setIsCartBadgeActive);
	const isCartBadgeActive = useCartStore((state) => state.isCartBadgeActive);
	const { restaurants } = useRestaurants();

	useEffect(() => {
		setIsCartBadgeActive(false);
	}, [isCartBadgeActive]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<ItemList items={cartItems} />
				<OrderSummary items={cartItems} restaurants={restaurants}>
					{cartItems.length > 0 && (
						<Button as={NavLink} variant="primary" to="/checkout">
							Proceed to Checkout
						</Button>
					)}
				</OrderSummary>
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
			{items.length > 0 && (
				<ul className={styles.list}>
					{items.map((item) => (
						<li className={styles.listItem} key={item.id}>
							<DishCard variant="cart" data={item} />
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
