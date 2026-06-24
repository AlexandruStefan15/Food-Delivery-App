export interface TextProps extends React.HTMLAttributes<HTMLElement> {
	as?: React.ElementType;
	children?: React.ReactNode;
}

export interface PriceRange {
	min: number | null;
	max: number | null;
}
