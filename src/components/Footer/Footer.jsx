import React from "react";
import styles from "./Footer.module.scss";

//components
import { NavLink } from "react-router";

export default function Footer({ className = "", ...props }) {
	return (
		<footer className={styles.section + ` ${className}`} {...props}>
			<div className={styles.container}>
				<p className={styles.text}>Ai întrebări? Sună la 0731-306-547</p>
				<div className={styles.navigation}>
					<ul className={styles.navList}>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Întrebări frecvente
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Relații cu investitorii
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Declarația de confidențialitate
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Test de viteză
							</NavLink>
						</li>
					</ul>
					<ul className={styles.navList}>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Asistență
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Cariere
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Preferințe de cookie
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Garanție legală
							</NavLink>
						</li>
					</ul>
					<ul className={styles.navList}>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Cont
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Modalități de vizionare
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Informații legate de companie
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Mențiuni legale
							</NavLink>
						</li>
					</ul>
					<ul className={styles.navList}>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Centru media
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Condiții de utilizare
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Contactează-ne
							</NavLink>
						</li>
						<li className={styles.listItem}>
							<NavLink to={0} className={styles.Link}>
								Doar pe Netflix
							</NavLink>
						</li>
					</ul>
				</div>
				<p className={styles.country}>Netflix Romania</p>
			</div>
		</footer>
	);
}

Footer.Navigation = function FooterNavigation({ className = "", children, ...props }) {
	return (
		<div className={styles.Navigation + ` ${className}`} {...props}>
			{children}
		</div>
	);
};

Footer.List = function FooterList({ className = "", children, ...props }) {
	return (
		<ul className={styles.List + ` ${className}`} {...props}>
			{children}
		</ul>
	);
};

Footer.ListItem = function ListItem({ className = "", children, ...props }) {
	return (
		<li className={styles.ListItem + ` ${className}`} {...props}>
			{children}
		</li>
	);
};

Footer.Navlink = function FooterNavlink({ className = "", children, ...props }) {
	return (
		<li>
			<Link className={styles.Navlink + ` ${className}`} {...props}>
				{children}
			</Link>
		</li>
	);
};
