export interface FooterProps extends React.ComponentPropsWithoutRef<"footer"> {
	navigation?: NavigationItem[];
}

export interface LinkListProps {
	title: string;
	links: NavLinkItem[];
	className?: string;
}

export interface NavigationItem {
	title: string;
	links: NavLinkItem[];
}

export interface NavLinkItem {
	label: string;
	path: string;
}

export interface TitleProps extends React.ComponentPropsWithoutRef<"h3"> {
	children: React.ReactNode;
}
