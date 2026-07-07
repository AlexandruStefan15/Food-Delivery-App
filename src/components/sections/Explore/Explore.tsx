import React from "react";
import styles from "./Explore.module.scss";
import { NavLink } from "react-router";

//components
import FoodCategoryCard from "../../FoodCategoryCard/FoodCategoryCard";

//data
import { useFoodCategories } from "../../../api/foodCategories";

export default function Explore({ showOnly = 7 }) {
	const { foodCategories } = useFoodCategories();

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2 className={styles.title}>Popular categories</h2>
				<ul className={styles.exploreList}>
					{foodCategories.map(
						(category, i) =>
							i < showOnly && (
								<li className={styles.listItem} key={category.id}>
									<NavLink to={`/restaurants?category=${encodeURIComponent(category.title)}`}>
										<FoodCategoryCard data={category} />
									</NavLink>
								</li>
							),
					)}
				</ul>
			</div>
		</section>
	);
}
