import styles from "./CircularCard.module.scss";

//types
import { FoodCategoryCardProps } from "./CircularCard.types";

export default function CircularCard({ data, className = "", ...props }: FoodCategoryCardProps) {
	return (
		<div className={`${styles.card} ${className}`} {...props}>
			{data.image && (
				<div className={styles.imgWrapper}>
					<img className={styles.img} src={data.image.url} alt={data.image.alt} />
				</div>
			)}
			<div className={styles.content}>
				<h3 className={styles.title}>{data.title}</h3>
			</div>
		</div>
	);
}
