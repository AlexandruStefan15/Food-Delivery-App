import { useQuery } from "@tanstack/react-query";
import type { Dish, MenuCategory } from "../types";

const fetchMenuCategoriesByRestaurant = async (restaurantId: number): Promise<MenuCategory[]> => {
	const [categoriesRes, dishesRes] = await Promise.all([
		fetch("http://localhost:3001/menu_categories"),
		fetch(`http://localhost:3001/dishes?restaurant_id=${restaurantId}`),
	]);

	if (!categoriesRes.ok || !dishesRes.ok) {
		throw new Error("Failed to fetch menu data");
	}

	const allCategories: MenuCategory[] = await categoriesRes.json();
	const restaurantDishes: Dish[] = await dishesRes.json();

	const usedCategoryIds = [...new Set(restaurantDishes.map((dish) => dish.menu_category_id))];

	return allCategories.filter((cat) => usedCategoryIds.includes(cat.id));
};

export const useRestaurantMenuCategories = (restaurantId: number | null) => {
	const {
		data: restaurantMenuCategories = [],
		isLoading: restaurantMenuCategoriesAreLoading,
		error: restaurantMenuCategoriesError,
	} = useQuery<MenuCategory[], Error>({
		queryKey: ["menuCategories", restaurantId],
		queryFn: () => fetchMenuCategoriesByRestaurant(restaurantId as number),
		enabled: !!restaurantId,
	});

	return {
		restaurantMenuCategories,
		restaurantMenuCategoriesAreLoading,
		restaurantMenuCategoriesError,
	};
};
