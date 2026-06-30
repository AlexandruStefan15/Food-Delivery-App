export interface Restaurant {
	id: number;
	name: string;
	category: string;
	card_image: string;
	cover_image: string;
	delivery_time: string;
	delivery_fee: number;
	rating: number;
	distance: number;
	closing_time: string;
	food_categories_ids: number[];
}
