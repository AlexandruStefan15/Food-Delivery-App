import styles from "./OrderSummary.module.scss";

//icons
import { MdLocalShipping } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";

//store
import { useCartStore } from "../../store/cartStore";

//helpers
import { getAverageTime } from "../../utils/helpers";

//types
import { OrderSummaryProps } from "./OrderSummary.types";

//components
import SearchBar from "../SearchBar/SearchBar";

const OrderSummary = ({ items, restaurants, children, className = "" }: OrderSummaryProps) => {
	const deliveryFee = useCartStore((state) => state.totalDeliveryFee(restaurants));
	const deliveryTime = useCartStore((state) => state.totalDeliveryTime(restaurants, getAverageTime));

	const subtotalPrice = () => {
		return items.reduce((total, item) => total + item.price * item.quantity, 0);
	};
	const totalPrice: number = deliveryFee + subtotalPrice();

	return (
		<div className={styles.orderSummary + ` ${className}`}>
			<h2 className={styles.orderSummaryTitle}>Order Summary</h2>
			<div className={styles.orderSummaryPromo}>
				<h3 className={styles.promoTitle}>Promo code</h3>
				<SearchBar
					className={styles.promoInput}
					wrapperClassname={styles.promoSearchBarWrapper}
					placeholder="Enter code"
					searchButtonContent="Apply"
					searchButtonProps={{ variant: "animated", className: styles.promoSearchBarSearchBtn }}
				/>
			</div>
			<div className={styles.orderSummaryDetails}>
				<div className={styles.row}>
					<span className={styles.text}>Subtotal</span>
					<span className={styles.value}>${subtotalPrice()}</span>
				</div>
				<div className={styles.row}>
					<span className={styles.text}>Delivery Fee</span>
					<span className={styles.value}>${deliveryFee.toFixed(2)}</span>
				</div>
				<div className={styles.row}>
					<span className={styles.text}>Service Fee & Taxes</span>
					<span className={styles.value}>$0.00</span>
				</div>
			</div>
			<hr style={{ border: "none", borderTop: " 2px dashed #ccc" }} />
			<div className={styles.cartTotalWrapper}>
				<span className={styles.text}>Total</span>
				<span className={styles.value}>${totalPrice}</span>
			</div>
			{children}
			<footer className={styles.footer}>
				<div className={styles.infoItem}>
					<MdLocalShipping className={styles.icon} />
					<span className={styles.text}>
						Estimated delivery time: <b>{deliveryTime.toFixed(0)} mins</b>
					</span>
				</div>
				<div className={styles.infoItem}>
					<MdOutlineSecurity className={styles.icon} />
					<span className={styles.text}> Secure payments with end-to-end encryption</span>
				</div>
			</footer>
		</div>
	);
};

export default OrderSummary;
