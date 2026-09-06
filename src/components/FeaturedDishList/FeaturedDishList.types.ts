import { Dish } from "../../types";

export interface FeaturedDishListProps extends React.ComponentPropsWithoutRef<"ul"> {
	dishes: Dish[];
}
