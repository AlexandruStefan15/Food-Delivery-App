import React, { ChangeEvent } from "react";
import styles from "./DeliveryAddressCard.module.scss";

//types
import type { DeliveryAddressCardProps } from "./DeliveryAddressCard.types";

//icons
import { GrEdit } from "react-icons/gr";

export default function DeliveryAddressCard({
	data,
	selectedAddress,
	onSelect,
	className = "",
}: DeliveryAddressCardProps) {
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.checked) {
			onSelect?.(data.id);
		}
	}

	return (
		<label className={`${styles.card} ${className} ${selectedAddress === data.id ? styles.selected : ""}`}>
			<input
				type="radio"
				name="deliveryAddress"
				className={styles.radioInput}
				value={data.id}
				onChange={handleChange}
			/>
			<div className={styles.content}>
				<div className={styles.details}>
					<p className={styles.name}>{data.label}</p>
					<p className={styles.address}>{data.street_address}</p>
				</div>
				{selectedAddress === data.id && <GrEdit className={styles.editIcon} />}
			</div>
		</label>
	);
}
