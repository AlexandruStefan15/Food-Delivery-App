import React, { ChangeEvent, useEffect } from "react";
import styles from "./PaymentCard.module.scss";

//types
import type { PaymentCardProps } from "./PaymentCard.types";

//icons
import { GrEdit } from "react-icons/gr";

export default function PaymentCard({
	data,
	selectedMethod,
	setSelectedMethod,
	onSelect,
	icon,
	className = "",
}: PaymentCardProps) {
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.checked) {
			onSelect?.(data.id);
		}
	}

	return (
		<label className={`${styles.card} ${className} ${selectedMethod === data.id ? styles.selected : ""}`}>
			<input
				type="radio"
				name="deliveryAddress"
				className={styles.radioInput}
				value={data.id}
				onChange={handleChange}
				checked={selectedMethod === data.id}
			/>
			<div className={styles.content}>
				<div className={styles.details}>
					{icon &&
						(() => {
							const Icon = icon;
							return <Icon />;
						})()}
					<p className={styles.name}>{data.name}</p>
				</div>
				{selectedMethod === data.id && <GrEdit className={styles.editIcon} />}
			</div>
		</label>
	);
}
