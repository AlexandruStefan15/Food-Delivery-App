import React from "react";
import styles from "./Footer.module.scss";

// types
import type { FooterProps, LinkListProps, NavigationItem } from "./Footer.types";

//components
import { NavLink } from "react-router";

const defaultNavigation: NavigationItem[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Întrebări frecvente", path: "#" },
      { label: "Relații cu investitorii", path: "#" },
      { label: "Declarația de confidențialitate", path: "#" },
      { label: "Test de viteză", path: "#" },
    ],
  },

  {
    title: "Help Center",
    links: [
      { label: "Get Help", path: "#" },
      { label: "Read FAQs", path: "#" },
      { label: "Legal guarantee", path: "#" },
      { label: "Language settings", path: "#" },
    ],
  },
];

export default function Footer({ className = "", navigation = defaultNavigation, ...props }: FooterProps) {
  return (
    <footer className={styles.footer + ` ${className}`} {...props}>
      <div className={styles.container}>
        <p className={styles.text}>Ai întrebări? Sună la 0731-306-547</p>
        <nav className={styles.navigation}>
          {navigation.map((item, index) => (
            <LinkList key={index} title={item.title} links={item.links} />
          ))}
        </nav>
        <p className={styles.country}>Netflix Romania</p>
      </div>
    </footer>
  );
}

export function LinkList({ title, links }: LinkListProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
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
