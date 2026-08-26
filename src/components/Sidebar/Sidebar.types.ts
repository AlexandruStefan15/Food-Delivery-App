export interface SidebarProps extends React.ComponentPropsWithoutRef<"aside"> {
	variant?: "default" | "blank";
	isOpen: Boolean;
	onClose: () => void;
}
