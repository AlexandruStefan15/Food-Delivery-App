import React from "react";
import styles from "./OrderCard.module.scss";

//types
import { OrderCardProps } from "./OrderCard.types";
import { CartItem } from "../../store/cartStore";

//icons
import { MdOutlineRestaurantMenu } from "react-icons/md";

//components
import Accordion from "../Accordion/Accordion";
import Card from "../Card/Card";

export default function OrderCard({ orderData }: OrderCardProps) {
	return (
		<Card className={styles.card}>
			<Accordion.Item className={styles.accordionItem}>
				<Accordion.Label>
					<div className={styles.labelInfoWrapper}>
						<div className={styles.labelIconWrapper}>
							<MdOutlineRestaurantMenu className={styles.icon} />
						</div>
						<div className={styles.labelInfo}>
							<span className={styles.orderId}>Order #{orderData.id}</span>
							<span className={styles.date}>{orderData.date}</span>
						</div>
					</div>
				</Accordion.Label>
				<Accordion.Details>
					<div className={styles.detailsContainer}>
						<h2 className={styles.detailsTitle}>Order Summary</h2>
						<ul className={styles.productList}>
							{orderData.products.map((product) => (
								<li className={styles.produtListItem}>
									<ProductItem productData={product} />
								</li>
							))}
						</ul>
					</div>
				</Accordion.Details>
			</Accordion.Item>
		</Card>
	);
}

interface ProductItemProps extends React.ComponentPropsWithoutRef<"div"> {
	productData: CartItem;
}

const ProductItem = ({ productData, className = "" }: ProductItemProps) => {
	return (
		<div className={styles.productItem + ` ${className}`}>
			<div className={styles.col}>
				<div className={styles.imgWrapper}>
					<img className={styles.img} src={productData.card_image} alt="product image"></img>
				</div>
				<div className={styles.titleWrapper}>
					<h2 className={styles.productTitle}>{productData.title}</h2>
					<span className={styles.quantity}>X {productData.quantity}</span>
				</div>
			</div>
			<span className={styles.productPrice}>${productData.price}</span>
		</div>
	);
};
