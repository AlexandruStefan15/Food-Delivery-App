import { useQuery } from "@tanstack/react-query";

export const useRestaurantFoodCategories = (restaurant) => {
	return useQuery({
		queryKey: ["food-categories", restaurant?.id],
		queryFn: async () => {
			const allCats = await fetch(`${process.env.REACT_APP_API_URL}/food-categories`).then(
				(res) => {
					if (!res.ok) {
						throw new Error("Failed to fetch food categories");
					}
					return res.json();
				},
			);
			return allCats.filter((cat) => restaurant.food_categories_ids.includes(cat.id));
		},
		enabled: !!restaurant,
	});
};
