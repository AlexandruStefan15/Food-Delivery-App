import React from "react";
import styles from "./FeatureCard.module.scss";

//types
import { FeatureCardProps } from "./FeatureCard.types";

export default function FeatureCard({ data, className = "", ...props }: FeatureCardProps) {
	return (
		<div className={`${styles.card} ${className}`} {...props}>
			<header className={styles.header}>
				{data.icon && (
					<div className={styles.iconWrapper}>
						{data.icon.type === "component" ? (
							<data.icon.component className={styles.icon} />
						) : (
							<img src={data.icon.src} alt={data.icon.alt} />
						)}
					</div>
				)}
			</header>

			<div className={styles.body}>
				<h3 className={styles.title}>{data.title}</h3>

				{data.subtitle && <h4 className={styles.subtitle}>{data.subtitle}</h4>}
			</div>
		</div>
	);
}
