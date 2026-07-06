//styles
import styles from "./DishCard.module.scss";

//types
import { DishCardProps } from "./DishCard.types";

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
						<Card.Title>{data.title}</Card.Title>
						<span className={styles.priceTag}>${data.price}</span>
					</div>
					<Card.Subtitle>{data.description}</Card.Subtitle>
				</header>
				<footer className={styles.contentFooter}>
					<div className={styles.labels}>
						{Object.entries(data.dietary)
							.filter(([key, value]) => value === true)
							.map(([key]) => (
								<span key={key}>{key.replace("_", " ")}</span>
							))}
					</div>
					<Button className={styles.addBtn}>+ Add</Button>
				</footer>
			</div>
		</Card>
	);
}
