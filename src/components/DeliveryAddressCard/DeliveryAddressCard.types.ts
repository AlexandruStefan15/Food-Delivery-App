import type { DeliveryAddress } from "../../types/deliveryAddress";

export interface DeliveryAddressCardProps {
	data: DeliveryAddress;
	className: string;
	setSelectedAddress?: (value: number) => void;
	selectedAddress?: number;
}
