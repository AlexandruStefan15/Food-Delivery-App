import { useQuery, UseQueryOptions, useQueryClient, useMutation } from "@tanstack/react-query";

import type { Order } from "../types/order";

export const QUERY_KEY_ORDERS = ["orders"] as const;

export function useOrders(options?: Omit<UseQueryOptions<Order[], Error>, "queryKey" | "queryFn">) {
	return useQuery<Order[], Error>({
		queryKey: QUERY_KEY_ORDERS,
		queryFn: async (): Promise<Order[]> => {
			const response = await fetch("/api/orders");

			if (!response.ok) {
				throw new Error(`Failed to fetch orders: ${response.statusText}`);
			}

			return response.json();
		},
		...options,
	});
}

export type CreateOrderInput = Omit<Order, "id" | "createdAt">;

export function useCreateOrder() {
	const queryClient = useQueryClient();

	return useMutation<Order, Error, CreateOrderInput>({
		mutationFn: async (newOrder: CreateOrderInput): Promise<Order> => {
			const response = await fetch("/api/orders", {
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
			queryClient.invalidateQueries({ queryKey: QUERY_KEY_ORDERS });
		},
	});
}
