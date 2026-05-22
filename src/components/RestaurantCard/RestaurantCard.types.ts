interface CardData {
	id: number;
	name: string;
	cuisine?: string;
	card_image?: string;
	delivery_time?: string;
	delivery_fee?: number;
}

export interface RestaurantCardProps extends React.ComponentPropsWithoutRef<"div"> {
	data: CardData;
}
