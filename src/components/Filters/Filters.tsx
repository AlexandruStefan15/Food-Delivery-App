import React, { useState } from "react";
import styles from "./Filters.module.scss";
import { useSearchParams } from "react-router";

//types
import { TextProps, PriceRange } from "./Filters.types";

//components
import DoubleRangeInput from "../DoubleRangeInput/DoubleRangeInput";

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
						<Filters.Title>Price Range</Filters.Title>
						<DoubleRangeInput
							min={0}
							max={100}
							valueIcon="$"
							onChange={({ min, max }) => {
								setPriceRange({ min, max });
							}}
						/>
					</div>
				)}
				{showCustomerRating && (
					<div className={styles.customerRating}>
						<Filters.Title>Customer Rating</Filters.Title>
						<ul className={styles.list}>
							{customerRating.map(({ rating, label }) => (
								<li className={styles.listItem} key={label}>
									<input className={styles.input} type="checkbox" />
									<Filters.Text>
										{rating}+ &nbsp; ({label})
									</Filters.Text>
								</li>
							))}
						</ul>
					</div>
				)}
				{showDietary && (
					<div className={styles.dietary}>
						<Filters.Title>Dietary Needs</Filters.Title>
						<ul className={styles.list}>
							{dietaryNeeds.map((value) => (
								<li className={styles.listItem} key={value}>
									<input className={styles.input} type="checkbox" />
									<Filters.Text>{value}</Filters.Text>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

Filters.Text = ({ children, className = "", as: Element = "span", ...props }: TextProps) => {
	return (
		<Element className={`${styles.text} ${className}`} {...props}>
			{children}
		</Element>
	);
};

Filters.Title = ({ className = "", children, ...props }: React.ComponentPropsWithoutRef<"div">) => {
	return (
		<h2 className={`${styles.title} ${className}`} {...props}>
			{children}
		</h2>
	);
};
