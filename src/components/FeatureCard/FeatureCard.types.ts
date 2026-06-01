import type { IconType } from "react-icons";

interface CardData {
	id: number;
	title: string;
	subtitle?: string;
	icon?:
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
}

export interface FeatureCardProps extends React.ComponentPropsWithoutRef<"div"> {
	data: CardData;
}
