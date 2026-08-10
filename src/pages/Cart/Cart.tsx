import React from "react";
import styles from "./Cart.module.scss";

//store
import { useCartStore } from "../../store/cartStore";

//types
import type { CartItem } from "../../store/cartStore";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DishCard from "../../components/DishCard/DishCard";

interface ItemListProps {
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
				{/* <OrderSummary/> */}
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
					<li className={styles.listItem}>
						<DishCard variant="cart" data={item} key={item.id} />
					</li>
				))}
			</ul>
		</div>
	);
};
