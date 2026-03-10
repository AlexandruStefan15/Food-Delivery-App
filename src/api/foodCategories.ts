import { useQuery } from "@tanstack/react-query";

import type { FoodCategory } from "../types";

export const useFoodCategories = () => {
  const {
    data: foodCategories = [],
    isLoading: foodCategoriesAreLoading,
    error: foodCategoriesError,
  } = useQuery<FoodCategory[]>({
    queryKey: ["food_categories"],
    queryFn: async (): Promise<FoodCategory[]> => {
      const res = await fetch("http://localhost:3001/food_categories");

      if (!res.ok) {
        throw new Error(`Failed to fetch food categories (Status: ${res.status})`);
      }

      return res.json();
    },
  });

  return {
    foodCategories,
    foodCategoriesAreLoading,
    foodCategoriesError,
  };
};