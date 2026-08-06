//styles
import styles from "./DishCard.module.scss";

//store
import { useCartStore } from "../../store/cartStore";

//types
import { DishCardProps, DietaryBadgeProps, ItemCounterProps } from "./DishCard.types";
import { Dietary } from "../../types";

//icons
import { MdAddShoppingCart } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi2";

//components
import Card from "../Card/Card";
import Button from "../Button/Button";

export default function DishCard(props: DishCardProps) {
	const addItem = useCartStore((state) => state.addItem);
	const removeItem = useCartStore((state) => state.removeItem);

	const { data, className = "" } = props;

	if (props.variant === "cart") {
		const { cartItem } = props;

		return (
			<Card className={`${styles.dishCard_cart} ${className}`}>
				<div className={styles.imgWrapper}>
					<img className={styles.img} src={data.card_image} alt={data.title} />
				</div>

				<div className={styles.content}>
					<header className={styles.contentHeader}>
						<div className={styles.titleWrapper}>
							<h2 className={styles.title}>{data.title}</h2>
							<span className={styles.priceTag}>${data.price.toFixed(2)}</span>
						</div>

						<div className={styles.labels}>
							{(Object.entries(data.dietary) as [keyof Dietary, boolean][])
								.filter(([, value]) => value)
								.map(([key]) => (
									<DietaryBadge value={key} key={key}>
										{key.replace("_", " ")}
									</DietaryBadge>
								))}
						</div>
					</header>

					<footer className={styles.contentFooter}>
						<ItemCounter item={cartItem} />

						<Button
							className={styles.addBtn}
							onClick={(event) => {
								event.preventDefault();
								removeItem(data.id);
							}}
						>
							<HiOutlineTrash size={19} />
							<span className={styles.cls}>Remove</span>
						</Button>
					</footer>
				</div>
			</Card>
		);
	}

	return (
		<Card className={`${styles.dishCard_default} ${className}`}>
			<div className={styles.imgWrapper}>
				<img className={styles.img} src={data.card_image} alt={data.title} />
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
							.filter(([, value]) => value)
							.map(([key]) => (
								<DietaryBadge value={key} key={key}>
									{key.replace("_", " ")}
								</DietaryBadge>
							))}
					</div>
				</header>

				<footer className={styles.contentFooter}>
					<Button
						className={styles.addBtn}
						onClick={(event) => {
							event.preventDefault();
							addItem(data);
						}}
					>
						<MdAddShoppingCart size={19} />
						<span className={styles.cls}>Add to cart</span>
					</Button>
				</footer>
			</div>
		</Card>
	);
}

const ItemCounter = ({ item, className = "" }: ItemCounterProps) => {
	const quantity = item?.quantity;

	return (
		<div className={styles.ItemCounter + ` ${className}`}>
			<button className={styles.decrement}>-</button>
			<span className={styles.count}>{quantity}</span>
			<button className={styles.increment}>+</button>
		</div>
	);
};

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
