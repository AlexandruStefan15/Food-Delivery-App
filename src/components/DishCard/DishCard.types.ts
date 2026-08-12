import type { Dish, Dietary } from "../../types";
import type { CartItem } from "../../store/cartStore";

export interface ItemCounterProps {
	item: CartItem;
	className?: string;
}

type DefaultDishCardProps = {
	variant?: "default";
	data: Dish;
	className?: string;
	classNames?: Record<string, string>;
};

type CartDishCardProps = {
	variant: "cart";
	data: CartItem;
	className?: string;
	classNames?: Record<string, string>;
};

export type DishCardProps = DefaultDishCardProps | CartDishCardProps;

export interface DietaryBadgeProps extends React.ComponentPropsWithoutRef<"span"> {
	value: keyof Dietary;
}
