import React from "react";

import Sidebar from "../Sidebar/Sidebar";

import { useSidebarContext } from "../../context/SidebarContext";

export default function NavigationSidebar() {
	const { isOpen, setIsOpen } = useSidebarContext();

	return <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
