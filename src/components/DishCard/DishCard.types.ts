import type { Dish, Dietary } from "../../types";
import type { CartItem } from "../../store/cartStore";

export interface ItemCounterProps {
	item: CartItem;
	className?: string;
}

type DefaultDishCardProps = {
	data: Dish;
	variant?: "default";
	cartItem?: never;
	className?: string;
};

type CartDishCardProps = {
	data: Dish;
	variant: "cart";
	cartItem: CartItem;
	className?: string;
};

export type DishCardProps = DefaultDishCardProps | CartDishCardProps;

export interface DietaryBadgeProps extends React.ComponentPropsWithoutRef<"span"> {
	value: keyof Dietary;
}
