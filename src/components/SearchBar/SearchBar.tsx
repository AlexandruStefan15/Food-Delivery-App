import React, { useState, useRef, ChangeEvent, ReactNode } from "react";
import styles from "./SearchBar.module.scss";
import { inlineSvgs } from "../../assets/svgs";

//components
import Button from "../Button/Button";

interface SearchBarProps extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange"> {
	placeholder?: string;
	onSearch?: (query: string) => void;
	onChange?: (value: string) => void;
	className?: string;
	children?: ReactNode;
	searchButtonContent?: ReactNode;
	searchButtonProps?: React.ComponentPropsWithoutRef<typeof Button>;
	formProps?: React.ComponentPropsWithoutRef<"form">;
}

const SearchBar = ({
	placeholder = "Search...",
	onSearch,
	onChange,
	className = "",
	children,
	searchButtonContent = <inlineSvgs.search wrapperClassName={styles.icon} />,
	searchButtonProps,
	formProps,
	...props
}: SearchBarProps) => {
	const [query, setQuery] = useState<string>("");
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
		onChange?.(value);
	};

	const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement> | React.MouseEvent) => {
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
			<Button
				className={styles.btn}
				variant="transparent"
				type="submit"
				{...searchButtonProps}
				onClick={(e) => {
					handleSubmit(e);
					searchButtonProps?.onClick?.(e);
				}}
			>
				{searchButtonContent}
			</Button>
		</form>
	);
};

export default SearchBar;
