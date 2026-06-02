import React from "react";
import styles from "./Footer.module.scss";
import { NavLink } from "react-router";

// types
import type { FooterProps, LinkListProps, NavigationItem, TitleProps } from "./Footer.types";

//svgs
import svgs from "../../assets/svgs";

//icons
import { FaGlobeAmericas } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdGroup } from "react-icons/md";
import { BiSend } from "react-icons/bi";

//components
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";

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

export default function Footer({ className = "", navigation = defaultNavigation, ...props }: FooterProps) {
	return (
		<footer className={styles.footer + ` ${className}`} {...props}>
			<nav className={styles.navigation}>
				<Col className={styles.intro}>
					<Logo className={styles.logo} src={svgs.logo_text_white} />
					<p className={styles.description}>
						Delicious meals from your favorite local restaurants, delivered straight to your door. Freshness guaranteed.
					</p>
					<div className={styles.utilities}>
						<NavLink to="#">
							<FaGlobeAmericas size={21} />
						</NavLink>
						<NavLink to="#">
							<IoShareSocialOutline size={23} />
						</NavLink>
						<NavLink to="#">
							<MdGroup size={26} />
						</NavLink>
					</div>
				</Col>
				{navigation.map((item, index) => (
					<LinkList key={index} title={item.title} links={item.links} />
				))}
				<Col className={styles.newsletter}>
					<Title>Newsletter</Title>
					<p className={styles.description}>Get the latest deals and new restaurant alerts. Don't miss anything.</p>
					<SearchBar searchButtonContent={<BiSend size={22} color="white" />} variant="2" placeholder="Your email..." />
				</Col>
			</nav>
		</footer>
	);
}

function LinkList({ title, links, className = "" }: LinkListProps) {
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

function Title({ className = "", children, ...props }: TitleProps) {
	return (
		<h3 className={styles.title} {...props}>
			{children}
		</h3>
	);
}

function Col({ children, className = "", ...props }: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div className={`${styles.col} ${className}`} {...props}>
			{children}
		</div>
	);
}
