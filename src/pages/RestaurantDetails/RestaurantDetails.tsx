import React from "react";
import styles from "./RestaurantDetails.module.scss";
import { useParams } from "react-router";

//api
import { useRestaurantById } from "../../api/restaurants";
import { useDishesByRestaurant } from "../../api/dishes";

//icon
import { IoMdStar } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function RestaurantDetails() {
	const { restaurantId } = useParams();
	const { restaurant, restaurantIsLoading, restaurantError } = useRestaurantById(restaurantId);
	const { dishes = [], dishesAreLoading, dishesError } = useDishesByRestaurant(Number(restaurantId));

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
				<div className={styles.content}></div>
			</main>
			<Footer />
		</div>
	);
}
