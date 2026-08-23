import { ReactNode } from "react";
import type { PaymentOption } from "../../types/paymentOption";

import type { IconType } from "react-icons";

export interface PaymentCardProps {
	data: PaymentOption;
	icon: IconType;
	className?: string;
	renderInput?: () => ReactNode;
	onSelect?: (value: number) => void;
	selectedMethod?: number | null;
	setSelectedMethod?: (value: number) => void;
}
