import type { IconType } from "react-icons";

export type IconData =
	| {
			type: "reactIconsComponent";
			component: IconType;
	  }
	| {
			type: "reactComponent";
			component: React.ComponentType<React.ComponentPropsWithoutRef<"svg">>;
	  }
	| {
			type: "image";
			src: string;
			alt: string;
	  };

export interface CardData {
	id: number;
	title: string;
	subtitle?: string;
	icon?: IconData;
}

export interface FeatureCardProps extends React.ComponentPropsWithoutRef<"div"> {
	data: CardData;
}
