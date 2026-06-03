import React, { forwardRef } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router";

// Types
import { HeaderProps, NavigationItem } from "./Header.types";

//assets
import svgs, { InlineSvgs } from "../../assets/svgs/index";

//context
import { useSidebarContext } from "../../context/SidebarContext";

//hooks
import { useIsTabletLarge } from "../../hooks/useIsTabletLarge";

//icons
import { MdOutlineShoppingBag } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

//components
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";

const defaultPrimaryNavigation: NavigationItem[] = [
	{ label: "Home", path: "#" },
	{ label: "Restaurants", path: "#" },
	{ label: "Orders", path: "#" },
	{ label: "Contact", path: "#" },
];

const defaultSecondaryNavigation: NavigationItem[] = [];

export default function Header({
	className = "",
	primaryNavigation = defaultPrimaryNavigation,
	secondaryNavigation = defaultSecondaryNavigation,
	...props
}: HeaderProps) {
	const isTabletLarge = useIsTabletLarge();
	const { setIsOpen } = useSidebarContext();

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
					{isTabletLarge ? (
						<div className={styles.hamburgerMenu} onClick={() => setIsOpen((prev) => !prev)}>
							<span />
							<span />
							<span />
						</div>
					) : (
						<SearchBar wrapperClassname={styles.searchBar} placeholder="Search menu items..." />
					)}
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
