import React, { forwardRef } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router";

// Types
import { HeaderProps, NavigationItem } from "./Header.types";

//assets
import svgs, { inlineSvgs } from "../../assets/svgs/index";

//icons
import { MdOutlineShoppingBag } from "react-icons/md";

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

const defaultSecondaryNavigation: NavigationItem[] = [];

export default function Header({
	className = "",
	primaryNavigation = defaultPrimaryNavigation,
	secondaryNavigation = defaultSecondaryNavigation,
	...props
}: HeaderProps) {
	return (
		<header className={styles.header + ` ${className}`} {...props}>
			<nav className={styles.navigation}>
				<div className={styles.primaryNavigation}>
					<Logo className={styles.logo} src={svgs.logo} />
					{primaryNavigation.length > 0 && (
						<ul className={styles.navList}>
							{primaryNavigation.map((item, index) => (
								<li className={styles.listItem} key={index}>
									<NavLink className={styles.link} to={item.path}>
										{item.label}
									</NavLink>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className={styles.secondaryNavigation}>
					<SearchBar formProps={{ className: styles.searchBar }} placeholder="Search..." />
					<MdOutlineShoppingBag className={styles.icon} />
					{secondaryNavigation.length > 0 && (
						<ul className={styles.navList}>
							{secondaryNavigation.map((item, index) => (
								<li className={styles.listItem} key={index}>
									<NavLink className={styles.link} to={item.path}>
										{item.label}
									</NavLink>
								</li>
							))}
						</ul>
					)}
				</div>
			</nav>
		</header>
	);
}
