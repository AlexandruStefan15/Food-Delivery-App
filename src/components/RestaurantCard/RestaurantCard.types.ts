import { Restaurant } from "../../types";

export interface RestaurantCardProps extends React.ComponentPropsWithoutRef<"div"> {
	data: Restaurant;
	variant?: "default" | "search";
}

export interface RatingBadgeProps extends React.ComponentPropsWithoutRef<"span"> {
	rating: number;
	icon?: React.ReactNode;
}
