import React from "react";
import styles from "./DishList.module.scss";

//types
import type { Dish } from "../../types";

//components
import DishCard from "../DishCard/DishCard";

interface DishListProps extends React.ComponentPropsWithoutRef<"ul"> {
	dishes: Dish[];
}

export default function DishList({ dishes = [] }: DishListProps) {
	return (
		<ul className={styles.list}>
			{dishes.map((dish) => (
				<li className={styles.listItem} key={dish.id}>
					<DishCard className={styles.dishCard} data={dish} />
				</li>
			))}
		</ul>
	);
}
