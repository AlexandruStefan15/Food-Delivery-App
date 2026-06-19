import React from "react";
import styles from "./Filters.module.scss";
import { useSearchParams } from "react-router";

//components
import PriceRange from "../PriceRange/PriceRange";

export default function Filters({ title = "Filters", subtitle = "Narrow your search results" }) {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<div className={styles.filtersContainer}>
			<header className={styles.header}>
				<h2 className={styles.title}>{title}</h2>
				<h3 className={styles.subtitle}>{subtitle}</h3>
			</header>
			<div className={styles.content}>
				<PriceRange
					min={0}
					max={100}
					onChange={({ min, max }) => {
						const newParams = new URLSearchParams(searchParams);
						newParams.set("minPrice", min.toString());
						newParams.set("maxPrice", max.toString());
						setSearchParams(newParams);
					}}
				/>
			</div>
		</div>
	);
}
