//styles
import styles from "./DishCard.module.scss";

//types
import { DishCardProps, DietaryBadgeProps } from "./DishCard.types";
import { Dietary } from "../../types";

//icons
import { MdAddShoppingCart } from "react-icons/md";

//components
import Card from "../Card/Card";
import Button from "../Button/Button";

export default function DishCard({ data, className = "" }: DishCardProps) {
	return (
		<Card className={styles.dishCard + ` ${className}`}>
			<div className={styles.imgWrapper}>
				<img className={styles.img} src={data.card_image} alt="dish"></img>
			</div>
			<div className={styles.content}>
				<header className={styles.contentHeader}>
					<div className={styles.titleWrapper}>
						<h2 className={styles.title}>{data.title}</h2>
						<span className={styles.priceTag}>${data.price.toFixed(2)}</span>
					</div>
					<Card.Subtitle className={styles.description}>{data.description}</Card.Subtitle>
					<div className={styles.labels}>
						{(Object.entries(data.dietary) as [keyof Dietary, boolean][])
							.filter(([key, value]) => value === true)
							.map(([key]) => (
								<DietaryBadge value={key} key={key}>
									{key.replace("_", " ")}
								</DietaryBadge>
							))}
					</div>
				</header>
				<footer className={styles.contentFooter}>
					<Button className={styles.addBtn}>
						<MdAddShoppingCart size={19} />
						<span className={styles.cls}>Add to cart</span>
					</Button>
				</footer>
			</div>
		</Card>
	);
}

const DietaryBadge = ({ value, className = "", children, ...props }: DietaryBadgeProps) => {
	const colorScheme: Record<keyof Dietary, { color: string; bg: string }> = {
		vegan: {
			color: "#2563eb",
			bg: "#dbeafe",
		},
		vegetarian: {
			color: "#16a34a",
			bg: "#dcfce7",
		},
		gluten_free: {
			color: "#a16207",
			bg: "#fef9c3",
		},
	};

	return (
		<span
			className={styles.dietaryBadge + ` ${className}`}
			style={{ color: colorScheme[value].color, backgroundColor: colorScheme[value].bg }}
			{...props}
		>
			{children}
		</span>
	);
};
