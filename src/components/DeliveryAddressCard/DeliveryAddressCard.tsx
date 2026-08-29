import React, { ChangeEvent, MouseEvent, useEffect } from "react";
import styles from "./DeliveryAddressCard.module.scss";

//types
import type { DeliveryAddressCardProps } from "./DeliveryAddressCard.types";

//components
import Checkbox from "../Checkbox/Checkbox";

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

	function handleEdit(e: MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		e.stopPropagation();
	}

	useEffect(() => {
		if (data.is_default) setSelectedAddress?.(data.id);
	}, [data.is_default]);

	return (
		<label className={`${styles.card} ${className} ${selectedAddress === data.id ? styles.selected : ""}`}>
			<Checkbox
				className={styles.radioInput}
				shape="circle"
				checkboxContent="dot"
				value={data.id}
				onChange={handleChange}
				checked={selectedAddress === data.id}
				type="radio"
				name="deliveryAddress"
			/>

			<div className={styles.content}>
				<div className={styles.details}>
					<p className={styles.name}>{data.label}</p>
					<p className={styles.address}>{data.street_address}</p>
				</div>
				{selectedAddress === data.id && (
					<button type="button" className={styles.editBtn} onClick={handleEdit}>
						<GrEdit className={styles.editIcon} />
					</button>
				)}
			</div>
		</label>
	);
}
