import { CartItem } from "../store/cartStore";

export interface Order {
	id: number;
	user_id: number;
	products: CartItem[];
	date: string;
	time: string;
	address: string;
	instructions: string;
	payment_method: string;
	delivered: boolean;
}
