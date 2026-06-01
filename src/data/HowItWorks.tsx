import type { IconType } from "react-icons";

//icons
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdRestaurant } from "react-icons/md";
import { MdOutlineDeliveryDining } from "react-icons/md";

type ItemIcon =
	| {
			type: "reactIcon";
			component: IconType;
	  }
	| {
			type: "node";
			node: React.ReactNode;
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

interface Data {
	title: string;
	subtitle: string;
	cards: Item[];
}

export const howItWorks_data: Data = {
	title: "How it works",
	subtitle: "Getting your favorite food is just three simple steps away.",
	cards: [
		{
			id: 1,
			title: "Choose your meal",
			subtitle: "Browse hundreds of local restaurants and curated menus.",
			icon: {
				type: "reactIcon",
				component: MdOutlineShoppingBag,
			},
		},
		{
			id: 2,
			title: "We cook with love",
			subtitle: "Our partner chefs prepare your meal fresh to your exact order.",
			icon: {
				type: "reactIcon",
				component: MdRestaurant,
			},
		},
		{
			id: 3,
			title: "Fast delivery",
			subtitle: "Track your order in real-time right to your front door.",
			icon: {
				type: "reactIcon",
				component: MdOutlineDeliveryDining,
			},
		},
	],
};
