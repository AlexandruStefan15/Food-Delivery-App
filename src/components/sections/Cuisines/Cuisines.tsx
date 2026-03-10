import React from "react";
import styles from "./Cuisines.module.scss";

//components
import FoodCard from "../../FoodCard/FoodCard";

//data
import { useFoodCategories } from "../../../api/foodCategories";

export default function Cuisines() {
	const { foodCategories, foodCategoriesAreLoading, foodCategoriesError } = useFoodCategories();

	return (
		<section className={styles.cuisines}>
			<div className={styles.container}>
				<ul className={styles.cuisineList}>
					{foodCategories.map((cuisine, i) => (
						<li className={styles.listItem} key={i}>
							<FoodCard data={cuisine} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
