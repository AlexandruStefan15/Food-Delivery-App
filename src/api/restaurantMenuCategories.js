import { useQuery } from "@tanstack/react-query";

const fetchMenuCategoriesByRestaurant = async (restaurantId) => {
	const [categoriesRes, dishesRes] = await Promise.all([
		fetch("http://localhost:3001/menu_categories"),
		fetch(`http://localhost:3001/dishes?restaurant_id=${restaurantId}`),
	]);

	if (!categoriesRes.ok || !dishesRes.ok) {
		throw new Error("Failed to fetch menu data");
	}

	const allCategories = await categoriesRes.json();
	const restaurantDishes = await dishesRes.json();

	// 1. Get unique menu_category_ids from the restaurant's dishes
	const usedCategoryIds = [...new Set(restaurantDishes.map((dish) => dish.menu_category_id))];

	// 2. Filter the master category list to only include those IDs
	return allCategories.filter((cat) => usedCategoryIds.includes(cat.id));
};

export const useRestaurantMenuCategories = (restaurantId) => {
	const {
		data: restaurantMenuCategories,
		isLoading: restaurantMenuCategoriesAreLoading,
		error: restaurantMenuCategoriesError,
	} = useQuery({
		queryKey: ["menuCategories", restaurantId],
		queryFn: () => fetchMenuCategoriesByRestaurant(restaurantId),
		enabled: !!restaurantId, // Only run if ID is provided
	});

	return {
		restaurantMenuCategories,
		restaurantMenuCategoriesAreLoading,
		restaurantMenuCategoriesError,
	};
};
