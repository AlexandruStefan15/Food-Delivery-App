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
	const { restaurantId, dishId } = useParams();

	return (
		<ul className={styles.list}>
			{dishes.map((dish) => (
				<li className={styles.listItem} key={dish.id}>
					<NavLink to={`/restaurants/${restaurantId}/dishes/${dishId}`}>
						<DishCard className={styles.dishCard} data={dish} />
					</NavLink>
				</li>
			))}
		</ul>
	);
}
