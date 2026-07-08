import { useQuery } from "@tanstack/react-query";
import type { Restaurant } from "../types";

export const useRestaurants = () => {
	const {
		data: restaurants = [],
		isLoading: restaurantsAreLoading,
		error: restaurantsError,
	} = useQuery<Restaurant[], Error>({
		queryKey: ["restaurants"],
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

export const useRestaurantById = (id: number | string | undefined) => {
	const {
		data: restaurant = {},
		isLoading: restaurantIsLoading,
		error: restaurantError,
	} = useQuery<Restaurant, Error>({
		queryKey: ["restaurant", id],
		enabled: id !== undefined && id !== null,
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
