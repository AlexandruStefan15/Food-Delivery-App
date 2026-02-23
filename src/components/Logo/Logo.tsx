import React from "react";
import styles from "./Logo.module.scss";
import { NavLink } from "react-router";

interface LogoProps extends React.ComponentPropsWithoutRef<"div"> {
	src: string;
	href?: string;
	className?: string;
}

export default function Logo({ className = "", src, href = "/", ...props }: LogoProps) {
	return (
		<div className={styles.logo + ` ${className}`} {...props}>
			<NavLink to={href}>
				<img className={styles.img} src={src} alt="logo" />
			</NavLink>
		</div>
	);
}
