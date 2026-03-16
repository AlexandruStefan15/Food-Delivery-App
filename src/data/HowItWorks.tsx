import { MdOutlineShoppingBag } from "react-icons/md";
import type { IconType } from "react-icons";

type ItemIcon =
	| {
			type: "component";
			component: IconType;
	  }
	| {
			type: "image";
			src: string;
			alt: string;
	  };

interface Item {
	id: number;
	title: string;
	subtitle: string;
	icon: ItemIcon;
}

export const howItWorks_data: Item[] = [
	{
		id: 1,
		title: "Choose your meal",
		subtitle: "Browse hundreds of local restaurants and curated menus.",
		icon: {
			type: "component",
			component: MdOutlineShoppingBag,
		},
	},
	{
		id: 2,
		title: "We cook with love",
		subtitle: "Our partner chefs prepare your meal fresh to your exact order.",
		icon: {
			type: "component",
			component: MdOutlineShoppingBag,
		},
	},
	{
		id: 3,
		title: "Fast delivery",
		subtitle: "Track your order in real-time right to your front door.",
		icon: {
			type: "component",
			component: MdOutlineShoppingBag,
		},
	},
];
