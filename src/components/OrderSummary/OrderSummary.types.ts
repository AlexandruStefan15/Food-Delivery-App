import { ReactNode } from "react";
import type { CartItem } from "../../store/cartStore";
import type { Restaurant } from "../../types";

export interface OrderSummaryProps {
	items: CartItem[];
	restaurants: Restaurant[];
	className?: string;
	children: ReactNode;
}
