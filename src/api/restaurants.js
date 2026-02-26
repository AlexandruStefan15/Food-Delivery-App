import { useQuery } from "@tanstack/react-query";

// Fetch All Restaurants
export const useRestaurants = () => {
	const {
		data: restaurants,
		isLoading: restaurantsAreLoading,
		error: restaurantsError,
	} = useQuery({
		queryKey: ["restaurants"],
		queryFn: async () => {
			const response = await fetch(`http://localhost:3001/restaurants`);
			if (!response.ok) {
				throw new Error(`Failed to fetch restaurants (Status: ${res.status})`);
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
