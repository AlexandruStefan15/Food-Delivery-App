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
	title?: string;
	name?: string;
	subtitle?: string;
	delivery_time?: string;
	delivery_fee?: number;
	cuisine?: string;
	card_image?: string;
}

export interface CardProps extends React.ComponentPropsWithoutRef<"div"> {
	variant?: "default" | "basic" | "featured";
	className?: string;
	data: CardData;
	children?: React.ReactNode;
}
