import type { MenuCategory } from "../../types";
import type { IconBaseProps } from "react-icons";

export type MenuCategoriesProps = {
	categories?: MenuCategory[];
	className?: string;
	activeCategoryId: number;
};

export type CategoryIconProps = {
	category: MenuCategory;
} & IconBaseProps;
