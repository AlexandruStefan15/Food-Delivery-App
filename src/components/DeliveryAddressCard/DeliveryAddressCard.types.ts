import { ReactNode } from "react";
import type { DeliveryAddress } from "../../types/deliveryAddress";

export interface DeliveryAddressCardProps {
	data: DeliveryAddress;
	className?: string;
	renderInput?: () => ReactNode;
	onSelect?: (value: number) => void;
	selectedAddress?: number | null;
	setSelectedAddress?: (value: number) => void;
}
