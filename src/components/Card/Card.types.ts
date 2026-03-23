import type { IconType } from "react-icons";

export interface CardData {
	id: number;
	image?: {
		url: string;
		alt: string;
	};
	icon?:
		| {
				type: "component";
				component: IconType;
		  }
		| {
				type: "image";
				src: string;
				alt: string;
		  };
	title: string;
	subtitle?: string;
	deliveryTime?: string;
	deliveryFee?: number;
}

export interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
	variant?: "default" | "basic" | "featured";
	className?: string;
	data: CardData;
	children?: React.ReactNode;
}
