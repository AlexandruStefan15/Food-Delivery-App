import { Dish, Dietary } from "../../types";

export type DishCardProps = {
	data: Dish;
	className?: string;
};

export interface DietaryBadgeProps extends React.ComponentPropsWithoutRef<"span"> {
	value: keyof Dietary;
}
