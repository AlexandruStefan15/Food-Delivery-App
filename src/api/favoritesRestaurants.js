import { useQuery } from "@tanstack/react-query";

// 6. Fetch Favorite Restaurants
export const useFavoriteRestaurants = () => {
	const {
		data: favoriteRestaurants,
		isLoading: favoriteRestaurantsAreLoading,
		error: favoriteRestaurantsError,
	} = useQuery({
		queryKey: ["restaurants", "favorites"],
		queryFn: async () => {
			try {
				const [allRestaurants, favIds] = await Promise.all([
					(async () => {
						const response = await fetch(`${process.env.REACT_APP_API_URL}/restaurants`);
						if (!response.ok) {
							throw new Error(`Failed to fetch restaurants (Status: ${response.status})`);
						}
						return response.json();
					})(),
					fetch(`${process.env.REACT_APP_API_URL}/favorites_restaurants_ids`).then((res) => {
						if (!res.ok) {
							throw new Error(`Failed to fetch food categories (Status: ${res.status})`);
						}
						return res.json();
					}),
				]);
				return allRestaurants.filter((r) => favIds.includes(r.id));
			} catch (error) {
				throw new Error("Could not load your favorite restaurants.");
			}
		},
	});

	return {
		favoriteRestaurants,
		favoriteRestaurantsAreLoading,
		favoriteRestaurantsError,
	};
};
