import { useQuery } from "@tanstack/react-query";

//types
import type { DeliveryAddress } from "../types/deliveryAddress";

export const useDeliveryAddresses = () => {
	return useQuery<DeliveryAddress[]>({
		queryKey: ["delivery_addresses"],
		queryFn: async (): Promise<DeliveryAddress[]> => {
			const response = await fetch("http://localhost:3001/delivery_addresses");

			if (!response.ok) {
				throw new Error("Failed to fetch delivery addresses");
			}

			const data = await response.json();
			return data;
		},
		staleTime: 1000 * 60 * 5,
	});
};
