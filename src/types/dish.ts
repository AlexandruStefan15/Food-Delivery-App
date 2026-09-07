export interface Dietary {
	vegan: boolean;
	gluten_free: boolean;
	vegetarian: boolean;
}

export interface Dish {
	id: number;
	title: string;
	description: string;
	discounted_price: number | null;
	calories: number;
	prep_time: string;
	rating: number;
	card_image: string;
	cover_image: string;
	price: number;
	dietary: Dietary;
	restaurant_id: number;
	menu_category_id: number;
}
