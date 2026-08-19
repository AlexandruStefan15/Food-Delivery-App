import React from "react";
import styles from "./FeatureCard.module.scss";

//types
import { FeatureCardProps } from "./FeatureCard.types";

//components
import Card from "../Card/Card";

export default function FeatureCard({ data, className = "", ...props }: FeatureCardProps) {
	return (
		<Card className={`${styles.card} ${className}`} {...props}>
			<header className={styles.header}>
				{data.icon && (
					<div className={styles.iconWrapper}>
						{data.icon.type === "reactIconsComponent" || data.icon.type === "reactComponent" ? (
							(() => {
								const Icon = data.icon.component;
								return <Icon className={styles.icon} />;
							})()
						) : (
							<img src={data.icon.src} alt={data.icon.alt} className={styles.icon} />
						)}
					</div>
				)}
			</header>
			<div className={styles.body}>
				<Card.Title>{data.title}</Card.Title>
				{data.subtitle && <Card.Subtitle>{data.subtitle}</Card.Subtitle>}
			</div>
		</Card>
	);
}
