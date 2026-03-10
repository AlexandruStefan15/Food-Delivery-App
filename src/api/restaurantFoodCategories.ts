import { useQuery } from "@tanstack/react-query";
import type { FoodCategory, Restaurant } from "../types";

export const useRestaurantFoodCategories = (restaurant: Restaurant | null) => {
  const {
    data: restaurantFoodCategories = [],
    isLoading: restaurantFoodCategoriesAreLoading,
    error: restaurantFoodCategoriesError,
  } = useQuery<FoodCategory[], Error>({
    queryKey: ["food_categories", restaurant?.id],
    queryFn: async (): Promise<FoodCategory[]> => {
      const res = await fetch("http://localhost:3001/food_categories");

      if (!res.ok) {
        throw new Error(`Failed to fetch food categories (Status: ${res.status})`);
      }

      const allCat: FoodCategory[] = await res.json();

      const ids = restaurant?.food_categories_ids || [];

      return allCat.filter((cat) => ids.includes(cat.id));
    },
    enabled: !!restaurant?.food_categories_ids?.length,
  });

  return {
    restaurantFoodCategories,
    restaurantFoodCategoriesAreLoading,
    restaurantFoodCategoriesError,
  };
};