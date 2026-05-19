import React from "react";
import styles from "./Logo.module.scss";
import { NavLink } from "react-router";

//images
import svgs from "../../assets/svgs";

interface LogoProps extends React.ComponentPropsWithoutRef<"div"> {
	src?: string;
	href?: string;
}

export default function Logo({ className = "", src = svgs.logo, href = "/", ...props }: LogoProps) {
	return (
		<div className={styles.logo + ` ${className}`} {...props}>
			<NavLink className={styles.link} to={href}>
				<img className={styles.img} src={src} alt="logo" />
			</NavLink>
		</div>
	);
}
