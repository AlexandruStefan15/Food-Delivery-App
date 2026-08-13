import { create } from "zustand";
import { persist } from "zustand/middleware";

//types
import { Dish, Restaurant } from "../types";

export type CartItem = Dish & {
	quantity: number;
};

type CartStore = {
	items: CartItem[];
	isCartBadgeActive: boolean;
	addItem: (dish: Dish) => void;
	removeItem: (dishId: number) => void;
	increaseQuantity: (dishId: number) => void;
	decreaseQuantity: (dishId: number) => void;
	clearCart: () => void;
	totalItems: () => number;
	totalPrice: () => number;
	totalDeliveryFee: (restaurants: Restaurant[]) => number;
	setIsCartBadgeActive: (x: boolean) => void;
};

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],
			isCartBadgeActive: false,

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
						isCartBadgeActive: true,
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
					isCartBadgeActive: true,
				});
			},

			removeItem: (dishId) => {
				set({
					items: get().items.filter((item) => item.id !== dishId),
					isCartBadgeActive: true,
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
					isCartBadgeActive: true,
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
					isCartBadgeActive: true,
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

			totalDeliveryFee: (restaurants) => {
				const items = get().items;
				if (items.length === 0) return 0;

				const restaurantIds = new Set(items.map((item) => item.restaurant_id));

				return Array.from(restaurantIds).reduce((totalFee, restId) => {
					const restaurant = restaurants.find((r) => r.id === restId);
					return totalFee + (restaurant?.delivery_fee ?? 0);
				}, 0);
			},

			setIsCartBadgeActive: (x: boolean) => {
				set({ isCartBadgeActive: x });
			},
		}),
		{
			name: "cart-storage",
		},
	),
);
