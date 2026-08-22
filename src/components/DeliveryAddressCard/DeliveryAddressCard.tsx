import React, { ChangeEvent, useEffect } from "react";
import styles from "./DeliveryAddressCard.module.scss";

//types
import type { DeliveryAddressCardProps } from "./DeliveryAddressCard.types";

//icons
import { GrEdit } from "react-icons/gr";

export default function DeliveryAddressCard({
	data,
	selectedAddress,
	setSelectedAddress,
	onSelect,
	className = "",
}: DeliveryAddressCardProps) {
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.checked) {
			onSelect?.(data.id);
		}
	}

	useEffect(() => {
		if (data.is_default) setSelectedAddress?.(data.id);
	}, [data.is_default]);

	return (
		<label className={`${styles.card} ${className} ${selectedAddress === data.id ? styles.selected : ""}`}>
			<input
				type="radio"
				name="deliveryAddress"
				className={styles.radioInput}
				value={data.id}
				onChange={handleChange}
				checked={selectedAddress === data.id}
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
