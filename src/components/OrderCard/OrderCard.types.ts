import { Order } from "../../types/order";

export interface OrderCardProps extends React.ComponentPropsWithoutRef<"div"> {
	orderData: Order;
}
