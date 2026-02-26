import { useQuery } from "@tanstack/react-query";

export const useFoodCategories = () => {
	const {
		data: foodCategories,
		isLoading: foodCategoriesAreLoading,
		error: foodCategoriesError,
	} = useQuery({
		queryKey: ["food-categories"],
		queryFn: () =>
			fetch(`http://localhost:3001/food-categories`).then((res) => {
				if (!res.ok) {
					throw new Error(`Failed to fetch food categories (Status: ${res.status})`);
				}
				return res.json();
			}),
	});

	return {
		foodCategories,
		foodCategoriesAreLoading,
		foodCategoriesError,
	};
};
