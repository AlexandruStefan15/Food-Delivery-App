import React from "react";
import styles from "./NavigationSidebar.module.scss";

import Sidebar from "../Sidebar/Sidebar";

//types
import type { NavigationSidebarProps, NavigationItem } from "./NavigationSidebar.types";

//context
import { useSidebarContext } from "../../context/SidebarContext";

//components
import { NavLink } from "react-router";

const defaultNavigation: NavigationItem[] = [
	{ label: "Home", path: "/" },
	{ label: "Restaurants", path: "/restaurants" },
	{ label: "Search", path: "/search" },
	{ label: "My orders", path: "/orders" },
	{ label: "Contact", path: "/contact" },
];

export default function NavigationSidebar({ navigation = defaultNavigation }: NavigationSidebarProps) {
	const { isOpen, setIsOpen } = useSidebarContext();

	return (
		<Sidebar className={styles.sidebar} isOpen={isOpen} onClose={() => setIsOpen(false)}>
			<div className={styles.body}>
				<nav className={styles.navigation}>
					<ul className={styles.linkList}>
						{navigation.map((item) => (
							<NavLink className={styles.link} to={item.path} key={item.label}>
								<li className={styles.listItem}>{item.label}</li>
							</NavLink>
						))}
					</ul>
				</nav>
			</div>
		</Sidebar>
	);
}
