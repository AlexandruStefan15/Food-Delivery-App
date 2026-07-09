import React from "react";
import styles from "./RestaurantDetails.module.scss";
import { useParams } from "react-router";

//api
import { useRestaurantById } from "../../api/restaurants";
import { useDishesByRestaurant } from "../../api/dishes";
import { useMenuCategories } from "../../api/menuCategories";

//icons
import { IoMdStar } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineTapas } from "react-icons/md";
import { MdFlatware } from "react-icons/md";
import { MdOutlineRestaurant } from "react-icons/md";
import { MdOutlineLocalBar } from "react-icons/md";
import { MdOutlineIcecream } from "react-icons/md";

//types
import type { MenuCategoriesProps, CategoryIconProps } from "./RestaurantDetails.types";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DishList from "../../components/DishList/DishList";

export default function RestaurantDetails() {
	const { restaurantId } = useParams();
	const { restaurant, restaurantIsLoading, restaurantError } = useRestaurantById(restaurantId);
	const { dishes = [], dishesAreLoading, dishesError } = useDishesByRestaurant(Number(restaurantId));
	const {
		menuCategories = [],
		menuCategoriesAreLoading,
		menuCategoriesError,
	} = useMenuCategories(Number(restaurantId));

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<div className={styles.banner}>
					<img className={styles.backgroundImg} src={restaurant?.cover_image} alt="cover"></img>
					<div className={styles.infoWrapper}>
						<h2 className={styles.title}>{restaurant?.name}</h2>
						<div className={styles.info}>
							<span className={`${styles.infoItem} ${styles.ratingWrapper}`}>
								<IoMdStar size={17} />
								<span className={styles.rating}>{restaurant?.rating}</span>
							</span>
							<span className={styles.infoItem}>
								<MdOutlineTimer size={17} />
								<span className={styles.deliveryTime}>{restaurant?.delivery_time} delivery</span>
							</span>
							<span className={styles.infoItem}>
								<HiOutlineLocationMarker size={17} />
								<span className={styles.distance}>{restaurant?.distance} km away</span>
							</span>
							<span className={`${styles.infoItem} ${styles.closingTime}`}>Open until {restaurant?.closing_time}</span>
						</div>
					</div>
				</div>
				<div className={styles.content}>
					<MenuCategories categories={menuCategories} />
					<DishList dishes={dishes} />
				</div>
			</main>
			<Footer />
		</div>
	);
}

const MenuCategories = ({ categories = [], className = "" }: MenuCategoriesProps) => {
	return (
		<div className={styles.menuCategoriesContainer + ` ${className}`}>
			<h2 className={styles.title}>Menu Categories</h2>

			<ul className={styles.list}>
				{categories.map((item) => (
					<li className={styles.listItem} key={item.id}>
						<CategoryIcon category={item} />
						<span>{item.title}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

const CategoryIcon = ({ category, ...props }: CategoryIconProps) => {
	switch (category.title) {
		case "Appetizers":
			return <MdOutlineTapas {...props} />;

		case "Signature Mains":
			return <MdFlatware {...props} />;

		case "Side Dishes":
			return <MdOutlineRestaurant {...props} />;

		case "Beverages":
			return <MdOutlineLocalBar {...props} />;

		case "Desserts":
			return <MdOutlineIcecream {...props} />;

		default:
			return <MdOutlineRestaurant {...props} />;
	}
};
