import React, { useEffect } from "react";
import styles from "./Sidebar.module.scss";
import { useLocation } from "react-router";

//types
import { SidebarProps, NavigationItem } from "./Sidebar.types";

//svgs
import { InlineSvgs } from "../../assets/svgs";

//context
import { useSidebarContext } from "../../context/SidebarContext";

//components
import { NavLink } from "react-router";

const defaultNavigation: NavigationItem[] = [
	{ label: "Home", path: "/" },
	{ label: "Restaurants", path: "/restaurants" },
	{ label: "Search", path: "/search" },
	{ label: "My orders", path: "/my-orders" },
	{ label: "Contact", path: "/contact" },
];

export default function Sidebar({
	navigation = defaultNavigation,
	children,
	isOpen,
	onClose,
	variant = "default",
}: SidebarProps) {
	const location = useLocation();

	useEffect(() => {
		onClose();
	}, [location.pathname]);

	if (variant === "blank")
		return <aside className={`${styles.sidebar} ${isOpen ? styles.active : ""}`}>{children}</aside>;

	return (
		<aside className={`${styles.sidebar} ${isOpen ? styles.active : ""}`}>
			<header className={styles.header}>
				<InlineSvgs.cancel className={styles.cancelIcon} onClick={() => onClose()} />
			</header>
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
		</aside>
	);
}
