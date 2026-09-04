import React from "react";
import styles from "./DishDetails.module.scss";
import { useParams } from "react-router";

//icons
import { IoStar } from "react-icons/io5";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";

//api
import { useDishById } from "../../api/dishes";

//store
import { useCartStore } from "../../store/cartStore";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";

export default function DishDetails() {
	const { dishId } = useParams();
	const { dish, dishIsLoading, dishError } = useDishById(Number(dishId));
	const addToCart = useCartStore((s) => s.addItem);

	if (dishIsLoading) return null;

	if (dishError) return <p className={styles.cls}>error</p>;

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<div className={styles.dishImg}>
					<img className={styles.img} src={dish?.card_image} alt="food"></img>
				</div>
				<div className={styles.content}>
					<span className={styles.rating}>
						<span className={styles.cls}>
							<IoStar size={15} />
						</span>
						<span className={styles.cls}>{dish?.rating} (rating)</span>
					</span>
					<h2 className={styles.dishTitle}>{dish?.title}</h2>
					<div className={styles.dishInfo}>
						<span className={styles.caloriesWrapper}>
							<MdOutlineLocalFireDepartment size={18} />
							<span className={styles.calories}>{dish?.calories} Cal</span>
						</span>
						<span className={styles.dot}></span>
						<span className={styles.preparationTime}>Preparation: {dish?.prep_time}</span>
					</div>
					<p className={styles.dishDescription}>{dish?.description}</p>
					<Button
						className={styles.addToCartBtn}
						onClick={() => {
							dish && addToCart(dish);
						}}
						variant="animated"
					>
						<MdAddShoppingCart size={22} />
						<span className={styles.cls}>Add to cart — ${dish?.price?.toFixed(2)}</span>
					</Button>
				</div>
			</main>
			<Footer />
		</div>
	);
}
