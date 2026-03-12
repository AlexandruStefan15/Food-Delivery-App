import React from "react";
import styles from "./Explore.module.scss";

//components
import FoodCard from "../../FoodCard/FoodCard";

//data
import { useFoodCategories } from "../../../api/foodCategories";

export default function Explore() {
	const { foodCategories, foodCategoriesAreLoading, foodCategoriesError } = useFoodCategories();

	return (
		<section className={styles.cuisines}>
			<div className={styles.container}>
				<ul className={styles.cuisineList}>
					{foodCategories.map((category) => (
						<li className={styles.listItem} key={category.id}>
							<FoodCard data={category} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
