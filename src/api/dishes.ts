import { useQuery } from "@tanstack/react-query";
import type { Dish } from "../types";

export const useDishes = (restaurantId: number | null) => {
  return useQuery<Dish[], Error>({
    queryKey: ["dishes", restaurantId],
    queryFn: async (): Promise<Dish[]> => {
      const res = await fetch(
        `http://localhost:3001/dishes?restaurant_id=${restaurantId}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch dishes (Status: ${res.status})`);
      }

      return res.json();
    },
    enabled: !!restaurantId,
  });
};