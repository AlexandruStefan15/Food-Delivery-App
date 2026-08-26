import { FoodCategory } from "../../types";

export interface RestaurantFiltersProps {
	className?: string;
	classNames?: Record<string, string>;
	variant?: "default" | "dark";
	title?: string;
	subtitle?: string;
	showPriceRange?: boolean;
	showCustomerRating?: boolean;
	showDietary?: boolean;
	showDeliveryTime?: boolean;
	showCategories?: boolean;
	categories?: FoodCategory[];
	onApply?: () => void;
	onReset?: () => void;
}

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
	as?: React.ElementType;
	children?: React.ReactNode;
}

export interface PriceRange {
	min: number | null;
	max: number | null;
}
