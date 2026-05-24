import React from "react";
import styles from "./HowItWorks.module.scss";

//data
import { howItWorks_data } from "../../../data/HowItWorks";

//components
import FeatureCard from "../../FeatureCard/FeatureCard";

export default function HowItWorks() {
	const { title, subtitle, cards } = howItWorks_data;

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<header className={styles.header}>
					<h2 className={styles.title}>{title}</h2>
					<h3 className={styles.subtitle}>{subtitle}</h3>
				</header>
				<ul className={styles.cardList}>
					{cards.map((item) => (
						<li className={styles.listItem} key={item.id}>
							<FeatureCard className={styles.card} data={item} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
