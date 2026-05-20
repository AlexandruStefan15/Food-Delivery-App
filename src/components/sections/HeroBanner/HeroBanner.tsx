import React from "react";
import styles from "./HeroBanner.module.scss";

//assets
import { inlineSvgs } from "../../../assets/svgs";

//componets
import SearchBar from "../../SearchBar/SearchBar";

export default function HeroBanner({
	title = "Cravings delivered to your doorstep.",
	subtitle = "Order from your favorite local restaurants with ease. Fast, fresh, and reliable.",
}) {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h1 className={styles.title}>{title}</h1>
				<h3 className={styles.subtitle}>{subtitle}</h3>
				<SearchBar
					className={styles.input}
					wrapperClassname={styles.searchBar}
					searchButtonContent="Find Food"
					searchButtonProps={{ variant: "animated" }}
					placeholder="Enter you delivery address..."
				>
					<inlineSvgs.location className={styles.locationIcon} />
				</SearchBar>
			</div>
		</section>
	);
}
