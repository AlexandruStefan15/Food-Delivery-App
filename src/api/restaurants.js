import { useQuery } from "@tanstack/react-query";

// Fetch All Restaurants
export const useRestaurants = () => {
	return useQuery({
		queryKey: ["restaurants"],
		queryFn: async () => {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/restaurants`);
			if (!response.ok) {
				throw new Error("Failed to fetch restaurants");
			}
			return response.json();
		},
	});
};
