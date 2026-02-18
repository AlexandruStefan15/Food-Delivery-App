import React, { forwardRef, useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { NavLink } from "react-router";

function Header({ className = "", navbarClassName = "", navbarProps, ...props }, ref) {
	return (
		<header ref={ref} className={styles.header + ` ${className}`} {...props}>
			<nav className={styles.nav}>
				{props.primaryNavigation ? (
					<div className={styles.primaryNavigationContainer}>
						<Logo className={styles.logo + ` ${props.classNameLogo}`} src={logo_path} />
						<ul className={styles.primaryNavigationList}>
							{props.primaryNavigation.map((item, index) => (
								<li className={styles.listItem} key={index}>
									<NavLink className={styles.link} to={item.path}>
										{item.name}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				) : (
					<Logo className={styles.logo} src={logo_path} />
				)}

				{props.secondaryNavigation && (
					<div className={styles.secondaryNavigation}>
						<SearchBar />
						<ul className={styles.secondaryNavigationList}>
							{props.secondaryNavigation.map((item, index) => (
								<li className={styles.listItem} key={index}>
									<NavLink className={styles.link} to={item.path}>
										{item.name}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				)}
			</nav>
		</header>
	);
}

export default forwardRef(Header);
