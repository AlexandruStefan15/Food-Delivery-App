import { create } from "zustand";
import { persist } from "zustand/middleware";

//types
import { Dish } from "../types";

export type CartItem = Dish & {
	quantity: number;
};

type CartStore = {
	items: CartItem[];
	addItem: (dish: Dish) => void;
	removeItem: (dishId: number) => void;
	increaseQuantity: (dishId: number) => void;
	decreaseQuantity: (dishId: number) => void;
	clearCart: () => void;
	totalItems: () => number;
	totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],

			addItem: (dish) => {
				const existingItem = get().items.find((item) => item.id === dish.id);

				if (existingItem) {
					set({
						items: get().items.map((item) =>
							item.id === dish.id
								? {
										...item,
										quantity: item.quantity + 1,
									}
								: item,
						),
					});

					return;
				}

				set({
					items: [
						...get().items,
						{
							...dish,
							quantity: 1,
						},
					],
				});
			},

			removeItem: (dishId) => {
				set({
					items: get().items.filter((item) => item.id !== dishId),
				});
			},

			increaseQuantity: (dishId) => {
				set({
					items: get().items.map((item) =>
						item.id === dishId
							? {
									...item,
									quantity: item.quantity + 1,
								}
							: item,
					),
				});
			},

			decreaseQuantity: (dishId) => {
				set({
					items: get()
						.items.map((item) =>
							item.id === dishId
								? {
										...item,
										quantity: item.quantity - 1,
									}
								: item,
						)
						.filter((item) => item.quantity > 0),
				});
			},

			clearCart: () => {
				set({
					items: [],
				});
				localStorage.removeItem("cart-storage");
			},

			totalItems: () => {
				return get().items.reduce((total, item) => total + item.quantity, 0);
			},

			totalPrice: () => {
				return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
			},
		}),
		{
			name: "cart-storage",
		},
	),
);
