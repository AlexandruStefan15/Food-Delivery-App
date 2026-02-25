import React from "react";
import styles from "./Footer.module.scss";

// types
import type { FooterProps, LinkListProps, NavigationItem, TitleProps } from "./Footer.types";

//components
import { NavLink } from "react-router";

const defaultNavigation: NavigationItem[] = [
	{
		title: "Quick Links",
		links: [
			{ label: "Add your restaurant", path: "#" },
			{ label: "Sign up to deliver", path: "#" },
			{ label: "Create a business account", path: "#" },
			{ label: "Latest promotions", path: "#" },
		],
	},

	{
		title: "Help Center",
		links: [
			{ label: "Get Help", path: "#" },
			{ label: "Read FAQs", path: "#" },
			{ label: "View all cities", path: "#" },
			{ label: "Language settings", path: "#" },
		],
	},
];

export default function Footer({
	className = "",
	navigation = defaultNavigation,
	...props
}: FooterProps) {
	return (
		<footer className={styles.footer + ` ${className}`} {...props}>
			<nav className={styles.navigation}>
				{navigation.map((item, index) => (
					<LinkList key={index} title={item.title} links={item.links} />
				))}
				<div className={styles.newsletter}>
					<Title>Newsletter</Title>
					<p>Get the latest deals and new restaurant alerts.</p>
				</div>
			</nav>
		</footer>
	);
}

export function LinkList({ title, links, className = "" }: LinkListProps) {
	return (
		<div className={styles.linkListContainer + ` ${className}`}>
			<Title>{title}</Title>
			<ul className={styles.navList}>
				{links.map((link, index) => (
					<li key={index} className={styles.listItem}>
						<NavLink to={link.path} className={styles.link}>
							{link.label}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}

export function Title({ className = "", children, ...props }: TitleProps) {
	return (
		<h3 className={styles.title} {...props}>
			{children}
		</h3>
	);
}
