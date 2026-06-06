import React, { forwardRef, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router";
import { useSearchParams } from "react-router";

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

//components
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import { SearchResultsList } from "../SearchResultsList/SearchResultsList";

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
	const [searchValue, setSearchValue] = useState("");
	const [isSearchResultsListActive, setIsSearchResultsListActive] = useState(false);
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
						<div className={styles.searchBarContainer}>
							<SearchBar
								wrapperClassname={styles.searchBarWrapper}
								value={searchValue}
								onChange={(value) => setSearchValue(value)}
								placeholder="Search menu items..."
								onBlur={() => setIsSearchResultsListActive(false)}
								onFocus={() => setIsSearchResultsListActive(true)}
							/>
							{isSearchResultsListActive && (
								<SearchResultsList searchValue={searchValue} className={styles.searchResultsList} />
							)}
						</div>
					)}
					<NavLink className={styles.cartLink} to="/cart">
						<MdOutlineShoppingBag className={styles.icon} />
					</NavLink>
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
