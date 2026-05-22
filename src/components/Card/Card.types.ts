import type { IconType } from "react-icons";

type DefaultCardData = {
	id: number;
	title: string;
	subtitle?: string;
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
};

type BasicCardData = {
	id: number;
	title: string;
	image?: {
		url: string;
		alt: string;
	};
};

type FeaturedCardData = {
	id: number;
	name: string;
	cuisine?: string;
	card_image?: string;
	delivery_time?: string;
	delivery_fee?: number;
};

type BaseCardProps = React.ComponentPropsWithoutRef<"div"> & {
	className?: string;
};

export type CardProps =
	| (BaseCardProps & {
			variant?: "default";
			data: DefaultCardData;
	  })
	| (BaseCardProps & {
			variant: "basic";
			data: BasicCardData;
	  })
	| (BaseCardProps & {
			variant: "featured";
			data: FeaturedCardData;
	  });
