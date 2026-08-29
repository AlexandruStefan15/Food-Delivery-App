import React, { ChangeEvent, useEffect } from "react";
import styles from "./PaymentCard.module.scss";

//types
import type { PaymentCardProps } from "./PaymentCard.types";

//components
import Checkbox from "../Checkbox/Checkbox";

export default function PaymentCard({
	data,
	selectedMethod,
	onSelect,
	icon,
	iconSize,
	className = "",
}: PaymentCardProps) {
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.checked) {
			onSelect?.(data.id);
		}
	}

	return (
		<label className={`${styles.card} ${className} ${selectedMethod === data.id ? styles.selected : ""}`}>
			<Checkbox
				className={styles.radioInput}
				shape="circle"
				checkboxContent="dot"
				value={data.id}
				onChange={handleChange}
				checked={selectedMethod === data.id}
				type="radio"
				name="paymentMethod"
			/>
			<div className={styles.content}>
				<div className={styles.details}>
					{icon &&
						(() => {
							const Icon = icon;
							return <Icon size={iconSize} />;
						})()}
					<p className={styles.name}>{data.name}</p>
				</div>
			</div>
		</label>
	);
}
