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
