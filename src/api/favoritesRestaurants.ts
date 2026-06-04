import { useQuery } from "@tanstack/react-query";
import type { Restaurant } from "../types";

export const useFavoriteRestaurants = () => {
	const {
		data: favoriteRestaurants = [],
		isLoading: favoriteRestaurantsAreLoading,
		error: favoriteRestaurantsError,
	} = useQuery<Restaurant[], Error>({
		queryKey: ["restaurants", "favorites"],
		queryFn: async (): Promise<Restaurant[]> => {
			const [allRestaurants, favIds] = await Promise.all([
				(async (): Promise<Restaurant[]> => {
					const response = await fetch("http://localhost:3001/restaurants");

					if (!response.ok) {
						throw new Error(`Failed to fetch restaurants (Status: ${response.status})`);
					}

					return response.json();
				})(),
				(async (): Promise<number[]> => {
					const res = await fetch("http://localhost:3001/favorites_restaurants_ids");

					if (!res.ok) {
						throw new Error(`Failed to fetch favorite restaurant ids (Status: ${res.status})`);
					}

					return res.json();
				})(),
			]);

			return allRestaurants.filter((restaurant) => favIds.includes(restaurant.id));
		},
	});

	return {
		favoriteRestaurants,
		favoriteRestaurantsAreLoading,
		favoriteRestaurantsError,
	};
};
