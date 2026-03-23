import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dish } from "../types";

export const useDishes = (restaurantId: number | null) => {
	return useQuery<Dish[], Error>({
		queryKey: ["dishes", restaurantId],
		queryFn: async (): Promise<Dish[]> => {
			const res = await fetch(`http://localhost:3001/dishes?restaurant_id=${restaurantId}`);

			if (!res.ok) {
				throw new Error(`Failed to fetch dishes (Status: ${res.status})`);
			}

			return res.json();
		},
		enabled: !!restaurantId,
	});
};

export const useAddDish = () => {
	const queryClient = useQueryClient();

	const {
		mutate: createProject,
		isPending: isCreating,
		error: createError,
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
				queryKey: ["dishes", data.restaurant_id],
			});
		},
	});

	return {
		createProject,
		isCreating,
		createError,
	};
};
