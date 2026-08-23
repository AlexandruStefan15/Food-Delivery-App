import { Dish } from "./dish";

export interface Order {
	id: number;
	user_id: number;
	products: Dish[];
	date: string;
	time: string;
	address: string;
	instructions: string;
	payment_method: string;
}
