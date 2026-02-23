import { useQuery } from "@tanstack/react-query";

// Fetch Dishes by Restaurant ID
export const useDishes = (restaurantId) => {
	return useQuery({
		queryKey: ["dishes", restaurantId],
		queryFn: () =>
			fetch(`${process.env.REACT_APP_API_URL}/dishes?restaurantId=${restaurantId}`).then((res) => {
				if (!res.ok) {
					throw new Error("Failed to fetch dishes");
				}
				return res.json();
			}),
		enabled: !!restaurantId, // Only run if ID is provided
	});
};
