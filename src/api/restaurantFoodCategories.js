import { useQuery } from "@tanstack/react-query";

export const useRestaurantFoodCategories = (restaurant) => {
	// Destructure and rename properties using the "key: newName" syntax
	const {
		data: restaurantFoodCategories,
		isLoading: restaurantFoodCategoriesAreLoading,
		error: restaurantFoodCategoriesError,
	} = useQuery({
		queryKey: ["food-categories", restaurant?.id],
		queryFn: async () => {
			const res = await fetch(`http://localhost:3001/food_categories`);

			if (!res.ok) {
				throw new Error(`Failed to fetch food categories (Status: ${res.status})`);
			}

			const allCat = await res.json();

			// get the IDs from the restaurant object
			const ids = restaurant?.food_categories_ids || [];

			// filter global categories to only return the ones this restaurant has
			return allCat.filter((cat) => ids.includes(cat.id));
		},
		// the query only runs if restaurant exists and has category IDs
		enabled: !!restaurant?.food_categories_ids?.length,
	});

	return {
		restaurantFoodCategories,
		restaurantFoodCategoriesAreLoading,
		restaurantFoodCategoriesError,
	};
};
