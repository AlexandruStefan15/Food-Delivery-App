import React from "react";
import styles from "./DeliveryAddressCard.module.scss";

import type { DeliveryAddressCardProps } from "./DeliveryAddressCard.types";

export default function DeliveryAddressCard({ data, className = "" }: DeliveryAddressCardProps) {
	return <div className={styles.card + ` ${className}`}></div>;
}
