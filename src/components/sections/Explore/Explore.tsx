import React from "react";
import styles from "./Explore.module.scss";
import { NavLink } from "react-router";

//components
import FoodCard from "../../FoodCard/FoodCard";

//data
import { useFoodCategories } from "../../../api/foodCategories";

export default function Explore() {
	const { foodCategories, foodCategoriesAreLoading, foodCategoriesError } = useFoodCategories();

	return (
		<section className={styles.exploreSection}>
			<div className={styles.container}>
				<h2 className={styles.title}>Explore Cuisines</h2>
				<ul className={styles.exploreList}>
					{foodCategories.map((category) => (
						<li className={styles.listItem} key={category.id}>
							<NavLink to={`/restaurants?category=${encodeURIComponent(category.title)}`}>
								<FoodCard data={category} />
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
