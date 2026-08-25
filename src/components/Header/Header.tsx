import React, { forwardRef, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router";
import { useSearchParams, useNavigate, useLocation } from "react-router";

// Types
import { HeaderProps, NavigationItem } from "./Header.types";

//assets
import svgs from "../../assets/svgs/index";

//context
import { useSidebarContext } from "../../context/SidebarContext";

//store
import { useCartStore } from "../../store/cartStore";

//hooks
import { useIsTabletLarge } from "../../hooks/useIsTabletLarge";

//icons
import { MdOutlineShoppingBag } from "react-icons/md";

//components
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import SearchResultsList from "../SearchResultsList/SearchResultsList";

const defaultPrimaryNavigation: NavigationItem[] = [
	{ label: "Home", path: "/" },
	{ label: "Restaurants", path: "/restaurants" },
	{ label: "Orders", path: "#" },
	{ label: "Contact", path: "#" },
];

const defaultSecondaryNavigation: NavigationItem[] = [];

export default function Header({
	className = "",
	classNames = {},
	primaryNavigation = defaultPrimaryNavigation,
	secondaryNavigation = defaultSecondaryNavigation,
	children,
	...props
}: HeaderProps) {
	const [searchValue, setSearchValue] = useState("");
	const [isSearchResultsListActive, setIsSearchResultsListActive] = useState(false);

	const totalItems = useCartStore((state) => state.totalItems());
	const isCartBadgeActive = useCartStore((state) => state.isCartBadgeActive);

	const isTabletLarge = useIsTabletLarge();
	const { setIsOpen } = useSidebarContext();
	const navigate = useNavigate();
	const location = useLocation();

	const showCartBadge = totalItems > 0 && isCartBadgeActive;

	useEffect(() => {
		setSearchValue("");
	}, [location.pathname]);

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
						<div
							className={styles.hamburgerMenu + ` ${classNames.hamburgerMenu}`}
							onClick={() => setIsOpen((prev) => !prev)}
						>
							<span className={styles.hamburgerMenuLine} />
							<span className={styles.hamburgerMenuLine} />
							<span className={styles.hamburgerMenuLine} />
						</div>
					) : (
						<div className={styles.searchBarContainer}>
							<SearchBar
								wrapperClassname={styles.searchBarWrapper}
								value={searchValue}
								onChange={(value) => setSearchValue(value)}
								placeholder="Search restaurants..."
								onSearch={(query) => navigate(`/restaurants?searchValue=${query}`)}
								onBlur={() => setIsSearchResultsListActive(false)}
								onFocus={() => setIsSearchResultsListActive(true)}
							/>
							{isSearchResultsListActive && (
								<SearchResultsList
									className={styles.searchResultsList}
									searchValue={searchValue}
									onMouseDown={(e) => {
										e.preventDefault(); // prevents input blur
									}}
								/>
							)}
						</div>
					)}
					<NavLink className={styles.cartLink} to="/cart">
						<MdOutlineShoppingBag className={styles.icon} />
						{showCartBadge && <span className={styles.cartBadge}>{totalItems}</span>}
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
			{children}
		</header>
	);
}
