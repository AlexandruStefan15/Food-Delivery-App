import React from "react";
import styles from "./DishList.module.scss";
import { useParams } from "react-router";

//types
import type { Dish } from "../../types";

//components
import DishCard from "../DishCard/DishCard";
import { NavLink } from "react-router";

interface DishListProps extends React.ComponentPropsWithoutRef<"ul"> {
	dishes: Dish[];
}

export default function DishList({ dishes = [] }: DishListProps) {
	const { restaurantId } = useParams();

	return (
		<ul className={styles.list}>
			{dishes.map((dish) => (
				<li className={styles.listItem} key={dish.id}>
					<NavLink className={styles.link} to={`/restaurants/${restaurantId}/dishes/${dish.id}`}>
						<DishCard className={styles.dishCard} data={dish} />
					</NavLink>
				</li>
			))}
		</ul>
	);
}
