import { useQuery } from "@tanstack/react-query";

import type { PaymentOption } from "../types/paymentOption";

export interface PaymentOptionsResponse {
	payment_options: PaymentOption[];
}

export function usePaymentOptions() {
	return useQuery<PaymentOption[], Error>({
		queryKey: ["paymentOptions"],
		queryFn: async function fetchPaymentOptions(): Promise<PaymentOption[]> {
			const response = await fetch("http://localhost:3001/payment_options");

			if (!response.ok) {
				throw new Error(`Failed to fetch payment options: ${response.statusText}`);
			}

			const data: PaymentOption[] = await response.json();
			return data;
		},
		staleTime: 1000 * 60 * 60,
	});
}

export function usePaymentOptionById(id: number | null) {
	return useQuery<PaymentOption, Error>({
		queryKey: ["paymentOptions", id],
		queryFn: async (): Promise<PaymentOption> => {
			const response = await fetch(`http://localhost:3001/payment_options/${id}`);

			if (!response.ok) {
				throw new Error(`Failed to fetch payment option: ${response.statusText}`);
			}

			const data: PaymentOption = await response.json();
			return data;
		},
		enabled: !!id,
		staleTime: 1000 * 60 * 60,
	});
}
