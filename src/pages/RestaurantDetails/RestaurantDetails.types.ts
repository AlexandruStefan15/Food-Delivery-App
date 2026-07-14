import type { MenuCategory } from "../../types";
import type { IconBaseProps } from "react-icons";

export type MenuCategoriesProps = {
	categories?: MenuCategory[];
	className?: string;
	activeCategoryId: number | null;
};

export type CategoryIconProps = {
	category: MenuCategory;
} & IconBaseProps;
