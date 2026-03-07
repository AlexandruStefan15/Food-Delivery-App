import React, { useState, useRef, ChangeEvent, ReactNode } from "react";
import styles from "./SearchBar.module.scss";
import { inline_svgs } from "../../assets/svgs";

interface SearchBarProps extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange"> {
	placeholder?: string;
	onSearch?: (query: string) => void;
	onChange?: (value: string) => void;
	className?: string;
	children?: ReactNode;
	searchButtonContent?: ReactNode;
	searchButtonProps?: React.ComponentPropsWithoutRef<"button">;
	formProps?: React.ComponentPropsWithoutRef<"form">; // Now explicitly in the interface
}

const SearchBar = ({
	placeholder = "Search...",
	onSearch,
	onChange,
	className = "", // Applied to the input for specific styling
	children,
	searchButtonContent = <inline_svgs.search wrapperProps={{ className: styles.icon }} />,
	searchButtonProps,
	formProps,
	...props // These are the "input-specific" props (e.g., name, disabled, readOnly)
}: SearchBarProps) => {
	const [query, setQuery] = useState<string>("");
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
		onChange?.(value);
	};

	const handleSubmit = (e: React.FormEvent | React.MouseEvent) => {
		e.preventDefault();
		onSearch?.(query);
	};

	return (
		<form
			{...formProps}
			onSubmit={handleSubmit}
			className={`${styles.form} ${isFocused ? styles.active : ""} ${formProps?.className || ""}`}
		>
			{children}
			<input
				type="text"
				value={query}
				ref={inputRef}
				onChange={handleChange}
				placeholder={placeholder}
				className={`${styles.input} ${className}`}
				onFocus={(e) => {
					setIsFocused(true);
					props.onFocus?.(e);
				}}
				onBlur={(e) => {
					setIsFocused(false);
					props.onBlur?.(e);
				}}
				{...props}
			/>
			<button
				type="submit"
				className={styles.button}
				{...searchButtonProps}
				onClick={(e) => {
					handleSubmit(e);
					searchButtonProps?.onClick?.(e);
				}}
			>
				{searchButtonContent}
			</button>
		</form>
	);
};

export default SearchBar;
