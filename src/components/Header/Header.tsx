import React, { forwardRef } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router";

// Types
import { HeaderProps, NavigationItem } from "./Header.types";

//assets
import svgs, { inline_svgs } from "../../assets/svgs/index";

//components
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";

const defaultPrimaryNavigation: NavigationItem[] = [
	{ label: "Home", path: "#" },
	{ label: "Restaurants", path: "#" },
	{ label: "Orders", path: "#" },
	{ label: "Contact", path: "#" },
	{ label: "Lista mea", path: "#" },
];

export default function Header({
	className = "",
	primaryNavigation = defaultPrimaryNavigation,
	...props
}: HeaderProps) {
	return (
		<header className={styles.header + ` ${className}`} {...props}>
			<nav className={styles.navigation}>
				<div className={styles.primaryNavigation}>
					<Logo className={styles.logo} src={svgs.logo} />
					<ul className={styles.navList}>
						{primaryNavigation.map((item, index) => (
							<li className={styles.listItem} key={index}>
								<NavLink className={styles.link} to={item.path}>
									{item.label}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
				<div className={styles.secondaryNavigation}>
					<SearchBar className={styles.searchBar} placeholder="Search..." />
					<inline_svgs.cart wrapperProps={{ className: styles.icon }} />
				</div>
			</nav>
		</header>
	);
}
