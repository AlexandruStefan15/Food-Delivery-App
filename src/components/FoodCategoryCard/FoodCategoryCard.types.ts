interface CardData {
	id: number;
	title: string;
	image?: {
		url: string;
		alt: string;
	};
}

export interface FoodCategoryCardProps extends React.ComponentPropsWithoutRef<"div"> {
	data: CardData;
}
