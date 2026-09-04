import { useQuery } from "@tanstack/react-query";
import type { Restaurant } from "../types";

export const useRestaurants = () => {
	const {
		data: restaurants = [],
		isLoading: restaurantsAreLoading,
		error: restaurantsError,
	} = useQuery<Restaurant[], Error>({
		queryKey: ["restaurants"],
		staleTime: 1000 * 60 * 5, // 5 min
		queryFn: async (): Promise<Restaurant[]> => {
			const response = await fetch("http://localhost:3001/restaurants");

			if (!response.ok) {
				throw new Error(`Failed to fetch restaurants (Status: ${response.status})`);
			}

			return response.json();
		},
	});

	return {
		restaurants,
		restaurantsAreLoading,
		restaurantsError,
	};
};

export const useRestaurantById = (id: number | null) => {
	const isValidId = id !== null && !Number.isNaN(id);

	const {
		data: restaurant,
		isLoading: restaurantIsLoading,
		error: restaurantError,
	} = useQuery<Restaurant, Error>({
		queryKey: ["restaurant", id],
		enabled: isValidId,
		queryFn: async (): Promise<Restaurant> => {
			const response = await fetch(`http://localhost:3001/restaurants/${id}`);

			if (!response.ok) {
				throw new Error(`Failed to fetch restaurant (Status: ${response.status})`);
			}

			return response.json();
		},
	});

	return {
		restaurant,
		restaurantIsLoading,
		restaurantError,
	};
};
