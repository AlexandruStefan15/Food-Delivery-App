import type { CSSProperties } from "react";
import styles from "./ActivityIndicator.module.scss";

type ActivityIndicatorProps = {
	size?: number;
	label?: string;
	className?: string;
	spinnerClassName?: string;
	style?: CSSProperties;
};

export default function ActivityIndicator({
	size = 24,
	label = "Loading",
	className = "",
	spinnerClassName = "",
	style,
}: ActivityIndicatorProps) {
	return (
		<span
			role="status"
			aria-label={label}
			aria-live="polite"
			className={`${styles.wrapper} ${className}`}
			style={{
				width: size,
				height: size,
				...style,
			}}
		>
			<span className={`${styles.spinner} ${spinnerClassName}`} />
		</span>
	);
}
