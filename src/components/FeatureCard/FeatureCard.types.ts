import type { IconType } from "react-icons";

interface CardData {
	id: number;
	title: string;
	subtitle?: string;
	icon?:
		| {
				type: "reactIconsComponent";
				component: IconType;
		  }
		| {
				type: "reactComponent";
				component: React.ComponentType<React.ComponentPropsWithoutRef<"svg">>;
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
