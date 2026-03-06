import React, { useState, useRef, ChangeEvent } from "react";
import styles from "./SearchBar.module.scss";
import { inline_svgs } from "../../assets/svgs";

interface SearchBarProps extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange"> {
	placeholder?: string;
	onSearch?: (query: string) => void;
	onChange?: (value: string) => void;
	className?: string;
}

const SearchBar = ({
	placeholder = "Search...",
	onSearch,
	onChange,
	className = "",
	...props
}: SearchBarProps) => {
	const [query, setQuery] = useState<string>("");
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);

		if (onChange) {
			onChange(value);
		}
	};

	const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement> | React.MouseEvent) => {
		e.preventDefault();

		if (onSearch) {
			onSearch(query);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={`${styles.form} ${isFocused ? styles.active : ""} ${className}`}
		>
			<input
				type="text"
				value={query}
				ref={inputRef}
				onChange={handleChange}
				placeholder={placeholder}
				className={styles.input}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				{...props}
			/>
			<button
				type="button"
				className={styles.button}
				onClick={(e) => {
					handleSubmit(e);
				}}
			>
				<inline_svgs.search wrapperProps={{ className: styles.icon }} />
			</button>
		</form>
	);
};

export default SearchBar;
