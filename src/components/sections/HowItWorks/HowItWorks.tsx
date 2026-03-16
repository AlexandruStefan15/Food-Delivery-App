import React from "react";
import styles from "./HowItWorks.module.scss";

//data
import { howItWorks_data } from "../../../data/HowItWorks";

//components
import Card from "../../Card/Card";

export default function HowItWorks() {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				{howItWorks_data.map((item) => (
					<Card data={item} variant="basic" key={item.id} />
				))}
			</div>
		</section>
	);
}
