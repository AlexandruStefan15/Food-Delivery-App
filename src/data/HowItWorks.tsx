//icons
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdRestaurant } from "react-icons/md";
import { MdOutlineDeliveryDining } from "react-icons/md";

import type { FeatureCardData } from "../components/FeatureCard/FeatureCard.types";

interface Data {
	title: string;
	subtitle: string;
	cards: FeatureCardData[];
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
				type: "reactIconsComponent",
				component: MdOutlineShoppingBag,
			},
		},
		{
			id: 2,
			title: "We cook with love",
			subtitle: "Our partner chefs prepare your meal fresh to your exact order.",
			icon: {
				type: "reactIconsComponent",
				component: MdRestaurant,
			},
		},
		{
			id: 3,
			title: "Fast delivery",
			subtitle: "Track your order in real-time right to your front door.",
			icon: {
				type: "reactIconsComponent",
				component: MdOutlineDeliveryDining,
			},
		},
	],
};
