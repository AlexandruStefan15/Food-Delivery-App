import { ReactNode } from "react";
import type { DeliveryAddress } from "../../types/deliveryAddress";

export interface DeliveryAddressCardProps {
	data: DeliveryAddress;
	className?: string;
	renderInput?: () => ReactNode;
	setSelectedAddress?: (value: number) => void;
	selectedAddress?: number;
}
