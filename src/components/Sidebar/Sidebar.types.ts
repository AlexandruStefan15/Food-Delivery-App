export interface SidebarProps extends React.ComponentPropsWithoutRef<"aside"> {
	navigation?: NavigationItem[];
}

export interface NavigationItem {
	label: string;
	path: string;
}
