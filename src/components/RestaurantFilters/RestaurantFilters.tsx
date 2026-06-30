import React, { useState } from "react";
import styles from "./RestaurantFilters.module.scss";
import { useSearchParams } from "react-router";

//types
import { TextProps, PriceRange } from "./RestaurantFilters.types";

//components
import DoubleRangeInput from "../DoubleRangeInput/DoubleRangeInput";
import RangeInput from "../RangeInput/RangeInput";
import Button from "../Button/Button";

const customerRating = [
	{ rating: 4.5, label: "Excellent" },
	{ rating: 4, label: "Verry good" },
	{ rating: 3.5, label: "Good" },
];

const dietaryNeeds = ["Vegan", "Gluten free", "Vegetarian"];

export default function RestaurantFilters({
	className = "",
	title = "Filters",
	subtitle = "Narrow your search results",
	showPriceRange = true,
	showCustomerRating = true,
	showDietary = true,
	showDeliveryTime = true,
}) {
	const [searchParams, setSearchParams] = useSearchParams();

	const [priceRange, setPriceRange] = useState<PriceRange>({ min: null, max: null });
	const [deliveryTime, setDeliveryTime] = useState(35);
	const [rating, setRating] = useState<number | null>(null);
	const [dietary, setDietary] = useState<string[]>([]);

	const handleApplyFilters = () => {
		const newParams = new URLSearchParams(searchParams);

		newParams.delete("minPrice");
		newParams.delete("maxPrice");
		newParams.delete("deliveryTime");
		newParams.delete("rating");
		newParams.delete("dietary");

		if (priceRange.min !== null) {
			newParams.set("minPrice", priceRange.min.toString());
		}

		if (priceRange.max !== null) {
			newParams.set("maxPrice", priceRange.max.toString());
		}

		if (deliveryTime) {
			newParams.set("deliveryTime", deliveryTime.toString());
		}

		if (rating !== null) {
			newParams.set("rating", rating.toString());
		}

		dietary.forEach((item) => {
			newParams.append("dietary", item);
		});

		setSearchParams(newParams);
	};

	const handleResetFilters = () => {
		setPriceRange({ min: null, max: null });
		setDeliveryTime(35);
		setRating(null);
		setDietary([]);

		const newParams = new URLSearchParams(searchParams);

		newParams.delete("minPrice");
		newParams.delete("maxPrice");
		newParams.delete("deliveryTime");
		newParams.delete("rating");
		newParams.delete("dietary");

		setSearchParams(newParams);
	};

	return (
		<div className={styles.filtersContainer + ` ${className}`}>
			<header className={styles.header}>
				<h2 className={styles.title}>{title}</h2>
				<h3 className={styles.subtitle}>{subtitle}</h3>
			</header>

			<div className={styles.content}>
				{showPriceRange && (
					<div className={styles.priceRange}>
						<RestaurantFilters.Title>Price Range</RestaurantFilters.Title>

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
						<RestaurantFilters.Title>Customer Rating</RestaurantFilters.Title>

						<ul className={styles.list}>
							{customerRating.map(({ rating: ratingValue, label }) => (
								<li className={styles.listItem} key={label}>
									<RestaurantFilters.Checkbox
										value={ratingValue}
										checked={rating === ratingValue}
										onChange={(e) => {
											if (e.target.checked) {
												setRating(ratingValue);
											} else {
												setRating(null);
											}
										}}
									/>

									<RestaurantFilters.Text>
										{ratingValue}+ &nbsp; ({label})
									</RestaurantFilters.Text>
								</li>
							))}
						</ul>
					</div>
				)}

				{showDietary && (
					<div className={styles.dietary}>
						<RestaurantFilters.Title>Dietary Needs</RestaurantFilters.Title>

						<ul className={styles.list}>
							{dietaryNeeds.map((value) => (
								<li className={styles.listItem} key={value}>
									<RestaurantFilters.Checkbox
										value={value}
										checked={dietary.includes(value)}
										onChange={(e) => {
											if (e.target.checked) {
												setDietary((prev) => [...prev, value]);
											} else {
												setDietary((prev) => prev.filter((item) => item !== value));
											}
										}}
									/>

									<RestaurantFilters.Text>{value}</RestaurantFilters.Text>
								</li>
							))}
						</ul>
					</div>
				)}

				{showDeliveryTime && (
					<div className={styles.deliveryTime}>
						<RestaurantFilters.Title>Delivery Time </RestaurantFilters.Title>

						<RangeInput
							className={styles.rangeInput}
							upsideDown={true}
							min={15}
							max={60}
							step={5}
							value={deliveryTime}
							onChange={setDeliveryTime}
							unit="min"
							markers={[
								{
									value: 35,
									label: "35 min",
								},
							]}
						/>
					</div>
				)}

				<div className={styles.actions}>
					<Button className={styles.btn} onClick={handleApplyFilters}>
						Apply Filters
					</Button>

					<Button variant="muted" className={styles.btn} onClick={handleResetFilters}>
						Reset All
					</Button>
				</div>
			</div>
		</div>
	);
}

RestaurantFilters.Text = ({ children, className = "", as: Element = "span", ...props }: TextProps) => {
	return (
		<Element className={`${styles.text} ${className}`} {...props}>
			{children}
		</Element>
	);
};

RestaurantFilters.Title = ({ className = "", children, ...props }: React.ComponentPropsWithoutRef<"div">) => {
	return (
		<h2 className={`${styles.title} ${className}`} {...props}>
			{children}
		</h2>
	);
};

RestaurantFilters.Checkbox = ({ className = "", children, ...props }: React.ComponentPropsWithoutRef<"input">) => {
	return (
		<label className={styles.roundCheckbox}>
			<input type="checkbox" className={`${styles.checkbox} ${className}`} {...props} />
			<span className={styles.checkmark}></span>
		</label>
	);
};
