import { useQuery } from "@tanstack/react-query";

export const useRestaurantFoodCategories = (restaurant) => {
	return useQuery({
		queryKey: ["food-categories", restaurant?.id],
		queryFn: async () => {
			const allCategories = await fetch(`http://localhost:3001/food-categories`).then((res) => {
				if (!res.ok) {
					throw new Error(`Failed to fetch food categories (Status: ${res.status})`);
				}
				return res.json();
			});
			return allCategories.filter((cat) => restaurant.food_categories_ids.includes(cat.id));
		},
		enabled: !!restaurant,
	});
};
