import { useQuery, UseQueryOptions, useQueryClient, useMutation } from "@tanstack/react-query";

import type { Order } from "../types/order";

export function useOrders() {
	return useQuery<Order[], Error>({
		queryKey: ["orders"],
		queryFn: async (): Promise<Order[]> => {
			const response = await fetch("http://localhost:3001/orders");

			if (!response.ok) {
				throw new Error(`Failed to fetch orders: ${response.statusText}`);
			}

			return response.json();
		},
	});
}

export type CreateOrderInput = {
	newOrder: Omit<Order, "id" | "createdAt">;
};

export function useCreateOrder() {
	const queryClient = useQueryClient();

	return useMutation<Order, Error, CreateOrderInput>({
		mutationFn: async (newOrder: CreateOrderInput): Promise<Order> => {
			const response = await fetch("http://localhost:3001/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newOrder),
			});

			if (!response.ok) {
				throw new Error(`Failed to create order: ${response.statusText}`);
			}

			return response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});
}

export function useOrdersByUserId(userId: number) {
	return useQuery<Order[], Error>({
		queryKey: ["orders", userId],
		queryFn: async (): Promise<Order[]> => {
			const response = await fetch(`http://localhost:3001/orders?userId=${encodeURIComponent(userId)}`);

			if (!response.ok) {
				throw new Error(`Failed to fetch orders for user ${userId}: ${response.statusText}`);
			}

			return response.json();
		},

		enabled: Boolean(userId),
		staleTime: 60_000,
		refetchOnWindowFocus: false,
	});
}
