interface CardData {
	id: number;
	name: string;
	main_cuisine?: string;
	card_image?: string;
	delivery_time?: string;
	delivery_fee?: number;
	rating?: number;
}

export interface RestaurantCardProps extends React.ComponentPropsWithoutRef<"div"> {
	data: CardData;
	variant?: "default" | "search";
}

export interface RatingBadgeProps extends React.ComponentPropsWithoutRef<"span"> {
	rating: number;
	icon?: React.ReactNode;
}
