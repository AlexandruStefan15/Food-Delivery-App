export interface NavigationItem {
	label: string;
	path: string;
}

export interface SidebarProps extends React.ComponentPropsWithoutRef<"aside"> {
	navigation?: NavigationItem[];
}
