import React from "react";
import styles from "./DishDetails.module.scss";
import { useParams } from "react-router";
import { Navigate } from "react-router";

//icons
import { IoStar } from "react-icons/io5";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";

//api
import { useDishById, useDishesByIds } from "../../api/dishes";
import { useRestaurantById } from "../../api/restaurants";

//store
import { useCartStore } from "../../store/cartStore";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import Textarea from "../../components/Textarea/Textarea";
import FeaturedDishList from "../../components/FeaturedDishList/FeaturedDishList";

export default function DishDetails() {
	const { dishId, restaurantId } = useParams();
	const { restaurant, restaurantIsLoading, restaurantError } = useRestaurantById(Number(restaurantId) || null);
	const { dish, dishIsLoading, dishError } = useDishById(Number(dishId) || null);
	const addToCart = useCartStore((s) => s.addItem);

	const featuredDishes = restaurant?.featuredDishesIds || [];
	const { dishes, dishesAreLoading, dishesError } = useDishesByIds(featuredDishes);

	if (dishIsLoading || restaurantIsLoading || dishesAreLoading) return null;

	if (dishError) return <p className={styles.error}>error fetching dish</p>;
	if (restaurantError) return <p className={styles.error}>error fetching restaurant</p>;
	if (dishesError) return <p className={styles.error}>error fetching featured dishes</p>;

	if (!Number(dishId)) {
		return <Navigate to="/404" replace />;
	}

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<div className={styles.imageCol}>
					<div className={styles.dishImgWrapper}>
						<img className={styles.img} src={dish?.card_image} alt="food"></img>
					</div>
					<FeaturedDishList dishes={dishes} />
				</div>

				<div className={styles.contentCol}>
					<div className={styles.flexWrapper}>
						{dish?.discounted_price && <span className={styles.discountBadge}>Discounted</span>}
						<span className={styles.ratingWrapper}>
							<IoStar size={15} />
							<span className={styles.rating}>{dish?.rating} (rating)</span>
						</span>
					</div>

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

					<Textarea
						className={styles.instructions}
						placeholder="Special instructions..."
						name="instructions"
						id="instructions"
					></Textarea>

					<Button
						className={styles.addToCartBtn}
						onClick={() => {
							dish && addToCart(dish);
						}}
						variant="animated"
					>
						<MdAddShoppingCart size={22} />
						<span className={styles.cls}>
							Add to cart — $
							{dish?.discounted_price != null ? dish?.discounted_price?.toFixed(2) : dish?.price?.toFixed(2)}
						</span>
					</Button>
				</div>
			</main>
			<Footer />
		</div>
	);
}
