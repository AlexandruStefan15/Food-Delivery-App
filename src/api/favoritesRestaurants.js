import { useQuery } from "@tanstack/react-query";

// 6. Fetch Favorite Restaurants
export const useFavoriteRestaurants = () => {
	return useQuery({
		queryKey: ["restaurants", "favorites"],
		queryFn: async () => {
			const [allRestaurants, favIds] = await Promise.all([
				api.getRestaurants(),
				api.getFavoriteRestaurantIds(),
			]);
			return allRestaurants.filter((r) => favIds.includes(r.id));
		},
	});
};
