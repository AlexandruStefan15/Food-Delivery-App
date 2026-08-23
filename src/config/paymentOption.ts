import { FaRegCreditCard } from "react-icons/fa6";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaCcMastercard } from "react-icons/fa";

import { IconType } from "react-icons";

export interface Config {
	label: string;
	icon: IconType;
}

export const paymentOptionConfig: Record<string, Config> = {
	visa: {
		label: "Visa",
		icon: FaRegCreditCard,
	},
	paypal: {
		label: "PayPal",
		icon: MdOutlineAccountBalanceWallet,
	},
	mastercard: {
		label: "Mastercard",
		icon: FaCcMastercard,
	},
};
