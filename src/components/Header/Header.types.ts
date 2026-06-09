export interface NavigationItem {
	label: string;
	path: string;
}

export interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
	primaryNavigation?: NavigationItem[];
	secondaryNavigation?: NavigationItem[];
	classNames?: {
		hamburgerMenu?: string;
	};
}
