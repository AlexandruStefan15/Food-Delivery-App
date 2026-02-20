import React, { forwardRef } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router";

//components
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";

//assets
import logo_path from "../../assets/logo.png";

const defaultNavigation = [
	{ name: "Home", path: "#" },
	{ name: "Restaurants", path: "movies" },
	{ name: "Orders", path: "tv-series" },
	{ name: "Contact", path: "#" },
	{ name: "Lista mea", path: "#" },
];

export default function Header({
	className = "",
	primaryNavigation = defaultNavigation,
	...props
}) {
	return (
		<header className={styles.header + ` ${className}`} {...props}>
			<nav className={styles.nav}>
				<div className={styles.left}>
					<Logo className={styles.logo} src={logo_path} />
					<ul className={styles.primaryNavigationList}>
						{primaryNavigation.map((item, index) => (
							<li className={styles.listItem} key={index}>
								<NavLink className={styles.link} to={item.path}>
									{item.name}
								</NavLink>
							</li>
						))}
					</ul>
				</div>

				<div className={styles.right}>
					<SearchBar />
				</div>
			</nav>
		</header>
	);
}
