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