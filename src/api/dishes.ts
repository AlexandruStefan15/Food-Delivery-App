import { useQuery, useMutation, useQueryClient, useQueries } from "@tanstack/react-query";
import type { Dish } from "../types";

export const useDishesByRestaurant = (restaurantId: number | null) => {
	const isValidId = restaurantId !== null && !Number.isNaN(restaurantId);

	const {
		data: dishes = [],
		isLoading: dishesAreLoading,
		error: dishesError,
	} = useQuery<Dish[], Error>({
		queryKey: ["dishes", "restaurant", restaurantId],
		enabled: isValidId,
		queryFn: async (): Promise<Dish[]> => {
			const res = await fetch(`http://localhost:3001/dishes?restaurant_id=${restaurantId}`);

			if (!res.ok) {
				throw new Error(`Failed to fetch dishes (Status: ${res.status})`);
			}

			return res.json();
		},
	});

	return { dishes, dishesAreLoading, dishesError };
};

export const useDishById = (dishId: number | null) => {
	const isValidId = dishId !== null && !Number.isNaN(dishId);

	const {
		data: dish,
		isLoading: dishIsLoading,
		error: dishError,
	} = useQuery<Dish, Error>({
		queryKey: ["dishes", "dish", dishId],
		enabled: isValidId,
		queryFn: async (): Promise<Dish> => {
			const res = await fetch(`http://localhost:3001/dishes/${dishId}`);

			if (!res.ok) {
				throw new Error(`Failed to fetch the dish (Status: ${res.status})`);
			}

			return res.json();
		},
	});

	return { dish, dishIsLoading, dishError };
};

export const useDishesByIds = (dishIds: number[]) => {
	const validIds = dishIds.filter((id) => id !== null && !Number.isNaN(id));

	const queries = useQueries({
		queries: validIds.map((dishId) => ({
			queryKey: ["dishes", "dish", dishId],
			queryFn: async (): Promise<Dish> => {
				const res = await fetch(`http://localhost:3001/dishes/${dishId}`);

				if (!res.ok) {
					throw new Error(`Failed to fetch dish ${dishId} (Status: ${res.status})`);
				}

				return res.json();
			},
		})),
	});

	const dishes = queries.map((query) => query.data).filter((dish): dish is Dish => Boolean(dish));

	const dishesAreLoading = queries.some((query) => query.isLoading);

	const dishesError = queries.find((query) => query.error)?.error ?? null;

	return {
		dishes,
		dishesAreLoading,
		dishesError,
	};
};

export const useAllDishes = () => {
	const {
		data = [],
		isLoading,
		error,
	} = useQuery<Dish[], Error>({
		queryKey: ["dishes"],
		queryFn: async (): Promise<Dish[]> => {
			const res = await fetch(`http://localhost:3001/dishes`);

			if (!res.ok) {
				throw new Error(`Failed to fetch dishes (Status: ${res.status})`);
			}

			return res.json();
		},
	});

	return { data, isLoading, error };
};

export const useAddDish = () => {
	const queryClient = useQueryClient();

	const {
		mutate: addDish,
		isPending: addDishIsPending,
		error: addDishError,
	} = useMutation<Dish, Error, Omit<Dish, "id">>({
		mutationFn: async (newDish): Promise<Dish> => {
			const res = await fetch("http://localhost:3001/dishes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newDish),
			});

			if (!res.ok) {
				throw new Error(`Failed to add dish (Status: ${res.status})`);
			}

			return res.json();
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["dishes"],
			});
		},
	});

	return {
		addDish,
		addDishIsPending,
		addDishError,
	};
};
