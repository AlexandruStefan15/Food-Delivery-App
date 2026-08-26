export interface NavigationItem {
	label: string;
	path: string;
}

export interface NavigationSidebarProps extends React.ComponentPropsWithoutRef<"aside"> {
	navigation?: NavigationItem[];
}
