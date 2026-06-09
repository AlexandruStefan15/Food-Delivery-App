import React, { useState } from "react";
import styles from "./Search.module.scss";

//components
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResultsList from "../../components/SearchResultsList/SearchResultsList";

export default function Search() {
	const [searchValue, setSearchValue] = useState("");

	return (
		<div className={styles.page}>
			<Header>
				<SearchBar
					wrapperClassname={styles.searchBarWrapper}
					className={styles.input}
					value={searchValue}
					onChange={setSearchValue}
				/>
			</Header>
			<main className={styles.main}>
				<SearchResultsList
					className={styles.searchResultsList}
					showOnly={10}
					searchValue={searchValue}
					restaurantCardProps={{ className: styles.restaurantCard }}
				/>
			</main>
		</div>
	);
}
