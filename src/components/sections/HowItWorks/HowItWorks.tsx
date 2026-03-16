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
				<Card data={howItWorks_data[0]} variant="basic" />
				<Card data={howItWorks_data[0]} variant="basic" />
				<Card data={howItWorks_data[0]} variant="basic" />
			</div>
		</section>
	);
}
