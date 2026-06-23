import React, { useState } from "react";
import styles from "./Filters.module.scss";
import { useSearchParams } from "react-router";

//components
import DoubleRangeInput from "../DoubleRangeInput/DoubleRangeInput";

interface PriceRange {
	min: number | null;
	max: number | null;
}

const customerRating = [
	{ rating: 4.5, label: "Excellent" },
	{ rating: 4, label: "Verry good" },
	{ rating: 3.5, label: "Good" },
];

const dietaryNeeds = ["Vegan", "Gluten free", "Vegetarian"];

export default function Filters({
	className = "",
	title = "Filters",
	subtitle = "Narrow your search results",
	showPriceRange = true,
	showCustomerRating = true,
	showDietary = true,
}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [priceRange, setPriceRange] = useState<PriceRange>({ min: null, max: null });
	const [deliveryTime, setDeliveryTime] = useState(null);

	return (
		<div className={styles.filtersContainer + ` ${className}`}>
			<header className={styles.header}>
				<h2 className={styles.title}>{title}</h2>
				<h3 className={styles.subtitle}>{subtitle}</h3>
			</header>
			<div className={styles.content}>
				{showPriceRange && (
					<div className={styles.priceRange}>
						<h3 className={styles.title}>Price Range</h3>
						<DoubleRangeInput
							min={0}
							max={100}
							onChange={({ min, max }) => {
								setPriceRange({ min, max });
							}}
						/>
					</div>
				)}
				{showCustomerRating && (
					<div className={styles.customerRating}>
						<h3 className={styles.title}>Customer Rating</h3>
						<ul className={styles.list}>
							{customerRating.map(({ rating, label }) => (
								<li className={styles.listItem} key={label}>
									<input className={styles.input} type="checkbox" />
									<span className={styles.text}>
										{rating}+ ({label})
									</span>
								</li>
							))}
						</ul>
					</div>
				)}
				{showDietary && (
					<div className={styles.dietary}>
						<h3 className={styles.title}>Dietary Needs</h3>
						<ul className={styles.list}>
							{dietaryNeeds.map((value) => (
								<li className={styles.listItem} key={value}>
									<input className={styles.input} type="checkbox" />
									<span className={styles.text}>{value}</span>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
