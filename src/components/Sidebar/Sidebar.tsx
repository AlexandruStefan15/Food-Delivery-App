import React, { useEffect } from "react";
import styles from "./Sidebar.module.scss";
import { useLocation } from "react-router";

//svgs
import { InlineSvgs } from "../../assets/svgs";

//types
import { SidebarProps } from "./Sidebar.types";

export default function Sidebar({ children, className = "", isOpen, onClose, variant = "default" }: SidebarProps) {
	const location = useLocation();

	useEffect(() => {
		onClose();
	}, [location.pathname]);

	return (
		<aside className={`${styles.sidebar} ${className} ${isOpen ? styles.active : ""}`}>
			<header className={styles.header}>
				<InlineSvgs.cancel className={styles.cancelIcon} onClick={() => onClose()} />
			</header>
			{children}
		</aside>
	);
}
