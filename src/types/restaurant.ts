export interface Restaurant {
	id: number;
	name: string;
	main_cuisine: string;
	card_image: string;
	cover_image: string;
	delivery_time: string;
	delivery_fee: number;
	rating: number;
	distance: number;
	closing_time: string;
	food_categories_ids: number[];
}
