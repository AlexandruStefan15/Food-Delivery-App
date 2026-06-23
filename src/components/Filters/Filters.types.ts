export type TextProps<T extends React.ElementType = "span"> = {
	as?: T;
	className?: string;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;
