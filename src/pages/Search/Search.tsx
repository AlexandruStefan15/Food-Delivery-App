import React, { useState } from "react";
import styles from "./Search.module.scss";
import { Navigate } from "react-router";

//hooks
import { useIsTabletLarge } from "../../hooks/useIsTabletLarge";

//components
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResultsList from "../../components/SearchResultsList/SearchResultsList";

export default function Search() {
	const [searchValue, setSearchValue] = useState("");
	const isTabletLarge = useIsTabletLarge();

	if (!isTabletLarge) return <Navigate to="/" replace />;

	return (
		<div className={styles.page}>
			<Header className={styles.header} classNames={{ hamburgerMenu: styles.hamburgerMenu }}>
				<SearchBar
					wrapperClassname={styles.searchBarWrapper}
					className={styles.input}
					value={searchValue}
					onChange={setSearchValue}
					placeholder="Search restaurants..."
				/>
			</Header>
			<main className={styles.main}>
				<SearchResultsList
					className={styles.searchResultsList}
					showOnly={10}
					searchValue={searchValue}
					restaurantCardProps={{ className: styles.restaurantCard }}
					showSeeMoreBtn={true}
					showSeeAllBtn={false}
				/>
			</main>
		</div>
	);
}
