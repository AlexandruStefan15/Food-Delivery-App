import React, { useState } from "react";
import styles from "./RestaurantFilters.module.scss";
import { useSearchParams } from "react-router";

//types
import { TextProps, PriceRange, RestaurantFiltersProps } from "./RestaurantFilters.types";

//components
import DoubleRangeInput from "../DoubleRangeInput/DoubleRangeInput";
import RangeInput from "../RangeInput/RangeInput";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";

const customerRating = [
	{ rating: 4.5, label: "Excellent" },
	{ rating: 4, label: "Verry good" },
	{ rating: 3.5, label: "Good" },
];

const dietaryNeeds = [
	{ label: "Vegan", value: "vegan" },
	{ label: "Gluten free", value: "gluten_free" },
	{ label: "Vegetarian", value: "vegetarian" },
];

export default function RestaurantFilters({
	className = "",
	classNames = {},
	variant = "default",
	title = "Filters",
	subtitle = "Narrow your search results",
	showPriceRange = true,
	showCustomerRating = true,
	showDietary = true,
	showDeliveryTime = true,
	showCategories = true,
	categories = [],
	onApply,
	onReset,
}: RestaurantFiltersProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [priceRange, setPriceRange] = useState<PriceRange>({ min: null, max: null });
	const [deliveryTime, setDeliveryTime] = useState(35);
	const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.getAll("category"));
	const [rating, setRating] = useState<number | null>(() => {
		const value = searchParams.get("rating");
		return Number(value) || null;
	});
	const [dietary, setDietary] = useState<string[]>(() => {
		return searchParams.getAll("dietary");
	});

	const handleApplyFilters = () => {
		const newParams = new URLSearchParams(searchParams);

		newParams.delete("minPrice");
		newParams.delete("maxPrice");
		newParams.delete("deliveryTime");
		newParams.delete("rating");
		newParams.delete("dietary");
		newParams.delete("category");

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

		if (selectedCategories !== null)
			selectedCategories.forEach((item) => {
				newParams.append("category", item);
			});

		dietary.forEach((item) => {
			newParams.append("dietary", item);
		});

		setSearchParams(newParams);
		onApply?.();
	};

	const handleResetFilters = () => {
		setPriceRange({ min: null, max: null });
		setDeliveryTime(35);
		setRating(null);
		setDietary([]);
		setSelectedCategories([]);

		setSearchParams({});
		onReset?.();
	};

	return (
		<div className={styles[`filtersContainer_${variant}`] + ` ${className}`}>
			<header className={styles.header}>
				<h2 className={styles.title}>{title}</h2>
				<h3 className={styles.subtitle}>{subtitle}</h3>
			</header>
			<div className={styles.content}>
				{showPriceRange && (
					<RestaurantFilters.Section className={styles.priceRange}>
						<RestaurantFilters.Title>Price Range</RestaurantFilters.Title>
						<DoubleRangeInput
							wrapperClassname={styles.doubleRangeInputWrapper}
							classNames={{ sliderValues: styles.sliderValues }}
							min={0}
							max={100}
							valueIcon="$"
							onChange={({ min, max }) => {
								setPriceRange({ min, max });
							}}
						/>
					</RestaurantFilters.Section>
				)}
				{showCustomerRating && (
					<RestaurantFilters.Section className={styles.customerRating}>
						<RestaurantFilters.Title>Customer Rating</RestaurantFilters.Title>
						<ul className={styles.list}>
							{customerRating.map(({ rating: ratingValue, label }) => (
								<li className={styles.listItem} key={label}>
									<RestaurantFilters.Checkbox
										className={classNames.checkbox}
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

									<RestaurantFilters.Label>
										{ratingValue}+ &nbsp; ({label})
									</RestaurantFilters.Label>
								</li>
							))}
						</ul>
					</RestaurantFilters.Section>
				)}
				{showDietary && (
					<RestaurantFilters.Section className={styles.dietary}>
						<RestaurantFilters.Title>Dietary Needs</RestaurantFilters.Title>
						<ul className={styles.list}>
							{dietaryNeeds.map(({ label, value }) => (
								<li className={styles.listItem} key={value}>
									<RestaurantFilters.Checkbox
										className={classNames.checkbox}
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
									<RestaurantFilters.Label>{label}</RestaurantFilters.Label>
								</li>
							))}
						</ul>
					</RestaurantFilters.Section>
				)}
				{showCategories && (
					<RestaurantFilters.Section className={styles.categories}>
						<RestaurantFilters.Title>Popular categories</RestaurantFilters.Title>
						<ul className={styles.list}>
							{categories.map((category) => (
								<li className={styles.listItem} key={category.id}>
									<RestaurantFilters.Checkbox
										className={classNames.checkbox}
										value={category.title}
										checked={selectedCategories.includes(category.title)}
										onChange={(e) => {
											if (e.target.checked) {
												setSelectedCategories((prev) => [...prev, e.target.value]);
											} else {
												setSelectedCategories((prev) => prev.filter((item) => item != e.target.value));
											}
										}}
									/>
									<RestaurantFilters.Label>{category.title}</RestaurantFilters.Label>
								</li>
							))}
						</ul>
					</RestaurantFilters.Section>
				)}
				{showDeliveryTime && (
					<RestaurantFilters.Section className={styles.deliveryTime}>
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
					</RestaurantFilters.Section>
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

RestaurantFilters.Section = ({ children, className = "", ...props }: React.ComponentPropsWithoutRef<"section">) => {
	return (
		<section className={`${styles.section} ${className}`} {...props}>
			{children}
		</section>
	);
};

RestaurantFilters.Label = ({ children, className = "", ...props }: React.ComponentPropsWithoutRef<"label">) => {
	return (
		<label className={`${styles.label} ${className}`} {...props}>
			{children}
		</label>
	);
};

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
		<Checkbox className={`${styles.checkbox} ${className}`} shape="round" {...props}>
			{children}
		</Checkbox>
	);
};
