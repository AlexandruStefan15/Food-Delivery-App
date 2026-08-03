import React, { useState } from "react";
import styles from "./RestaurantDetails.module.scss";
import { useParams } from "react-router";

//api
import { useRestaurantById } from "../../api/restaurants";
import { useDishesByRestaurant } from "../../api/dishes";
import { useMenuCategories } from "../../api/menuCategories";

//hooks
import { useActiveMenuCategory } from "../../hooks/useActiveMenuCategory";

//icons
import { IoMdStar } from "react-icons/io";
import { MdOutlineTimer } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineTapas } from "react-icons/md";
import { MdFlatware } from "react-icons/md";
import { MdOutlineRestaurant } from "react-icons/md";
import { MdOutlineLocalBar } from "react-icons/md";
import { MdOutlineIcecream } from "react-icons/md";

//types
import type { MenuCategoriesProps, CategoryIconProps } from "./RestaurantDetails.types";

//components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DishList from "../../components/DishList/DishList";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function RestaurantDetails() {
	const { restaurantId } = useParams();
	const { restaurant, restaurantIsLoading, restaurantError } = useRestaurantById(restaurantId);
	const { dishes = [], dishesAreLoading, dishesError } = useDishesByRestaurant(Number(restaurantId));
	const [searchValue, setSearchValue] = useState("");
	const {
		menuCategories = [],
		menuCategoriesAreLoading,
		menuCategoriesError,
	} = useMenuCategories(Number(restaurantId));

	const selectedMenuCategory = useActiveMenuCategory({
		sectionSelector: "[data-category-id]",
		initialCategoryId: menuCategories[0]?.id ?? null,
	});

	const filteredDishes = dishes.filter((dish) =>
		dish.title.trim().toLowerCase().includes(searchValue.trim().toLowerCase()),
	);

	const dishesByCategory = (categoryId: number) =>
		filteredDishes.filter((dish) => dish.menu_category_id === categoryId);

	const isLoading = restaurantIsLoading || dishesAreLoading || menuCategoriesAreLoading;
	const error = restaurantError || dishesError || menuCategoriesError;

	if (isLoading) {
		return (
			<div className={styles.page}>
				<Header />
				<main className={styles.main}>
					<p>Loading restaurant...</p>
				</main>
				<Footer />
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.page}>
				<Header />
				<main className={styles.main}>
					<p>{error.message}</p>
				</main>
				<Footer />
			</div>
		);
	}

	return (
		<div className={styles.page}>
			<Header />
			<main className={styles.main}>
				<div className={styles.banner}>
					<img className={styles.backgroundImg} src={restaurant?.cover_image} alt="cover"></img>
					<div className={styles.infoWrapper}>
						<h2 className={styles.title}>{restaurant?.name}</h2>
						<div className={styles.info}>
							<span className={`${styles.infoItem} ${styles.ratingWrapper}`}>
								<IoMdStar size={17} />
								<span className={styles.rating}>{restaurant?.rating}</span>
							</span>
							<span className={styles.infoItem}>
								<MdOutlineTimer size={17} />
								<span className={styles.deliveryTime}>{restaurant?.delivery_time} delivery</span>
							</span>
							<span className={styles.infoItem}>
								<HiOutlineLocationMarker size={17} />
								<span className={styles.distance}>{restaurant?.distance} km away</span>
							</span>
							<span className={`${styles.infoItem} ${styles.closingTime}`}>Open until {restaurant?.closing_time}</span>
						</div>
					</div>
				</div>
				<div className={styles.pageBody}>
					<MenuCategories categories={menuCategories} activeCategoryId={selectedMenuCategory} />
					<div className={styles.categorySectionsWrapper}>
						<SearchBar
							wrapperClassname={styles.searchbarWrapper}
							value={searchValue}
							onChange={(value) => setSearchValue(value)}
							placeholder="Search for a dish..."
							searchButtonProps={{ style: { width: "43px" } }}
						/>
						{(() => {
							let noItems = true;

							const items = menuCategories.map((category) => {
								if (dishesByCategory(category.id).length > 0) {
									noItems = false;
									return (
										<section
											className={styles.categorySection}
											key={category.id}
											id={`category-${category.id}`}
											data-category-id={category.id}
										>
											<h2 className={styles.title}>{category.title}</h2>
											<DishList className={styles.dishList} dishes={dishesByCategory(category.id)} />
										</section>
									);
								}
							});

							if (noItems) return <p className={styles.noResultsMessage}>No items found...</p>;
							else return items;
						})()}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

const MenuCategories = ({ categories = [], activeCategoryId, className = "" }: MenuCategoriesProps) => {
	const scrollToCategory = (categoryId: number) => {
		const section = document.getElementById(`category-${categoryId}`);

		section?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	return (
		<div className={styles.menuCategoriesContainer + ` ${className}`}>
			<div className={styles.innerWrapper}>
				<h2 className={styles.title}>Menu Categories</h2>
				<ul className={styles.list}>
					{categories.map((item) => (
						<li
							className={styles.listItem + ` ${activeCategoryId === item.id ? styles.active : ""}`}
							key={item.id}
							onClick={() => scrollToCategory(item.id)}
						>
							<CategoryIcon size={23.5} category={item} />
							<span>{item.title}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

const CategoryIcon = ({ category, ...props }: CategoryIconProps) => {
	switch (category.title) {
		case "Appetizers":
			return <MdOutlineTapas {...props} />;

		case "Signature Mains":
			return <MdFlatware {...props} />;

		case "Side Dishes":
			return <MdOutlineRestaurant {...props} />;

		case "Beverages":
			return <MdOutlineLocalBar {...props} />;

		case "Desserts":
			return <MdOutlineIcecream {...props} />;

		default:
			return <MdOutlineRestaurant {...props} />;
	}
};
