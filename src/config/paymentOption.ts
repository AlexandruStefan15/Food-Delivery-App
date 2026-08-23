import { FaRegCreditCard } from "react-icons/fa6";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaCcMastercard } from "react-icons/fa";

import { IconType } from "react-icons";

export interface Config {
	label: string;
	icon: IconType;
	iconSize: number;
}

export const paymentOptionConfig: Record<string, Config> = {
	visa: {
		label: "Visa",
		icon: FaRegCreditCard,
		iconSize: 20,
	},
	paypal: {
		label: "PayPal",
		icon: MdOutlineAccountBalanceWallet,
		iconSize: 22,
	},
	mastercard: {
		label: "Mastercard",
		icon: FaCcMastercard,
		iconSize: 20,
	},
};
