import type { IconType } from "react-icons";
import Card from "../Card/Card";

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

export interface FeatureCardData {
	id: number;
	title: string;
	subtitle?: string;
	icon?: IconData;
}

export interface FeatureCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
	data: FeatureCardData;
}
