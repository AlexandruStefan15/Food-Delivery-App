export interface AccordionDataItem {
	id: string | number;
	label: string;
	details: Record<string, string>;
}

export interface AccordionContextType {
	isExpanded: (index: number) => boolean;
	toggleItem: (index: number) => void;
}

export interface ItemContextType {
	index: number;
}

export interface AccordionProps extends React.ComponentPropsWithoutRef<"ul"> {
	data?: AccordionDataItem[];
	allowMultiple?: boolean;
	defaultSelected?: number | number[];
}

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<"li"> {
	index?: number;
}

export interface AccordionIconProps extends React.ComponentPropsWithoutRef<"span"> {
	src?: string;
	alt?: string;
}
