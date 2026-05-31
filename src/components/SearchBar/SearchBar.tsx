import React, { useState, useRef, ChangeEvent, ReactNode } from "react";
import styles from "./SearchBar.module.scss";
import { InlineSvgs } from "../../assets/svgs";

//components
import Button from "../Button/Button";

interface SearchBarProps extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange"> {
	placeholder?: string;
	onSearch?: (query: string) => void;
	onChange?: (value: string) => void;
	className?: string;
	wrapperClassname?: string;
	children?: ReactNode;
	searchButtonContent?: ReactNode;
	searchButtonProps?: React.ComponentPropsWithoutRef<typeof Button>;
	showSearchBtn?: boolean;
	variant?: string;
}

const SearchBar = ({
	placeholder = "Search...",
	onSearch,
	onChange,
	className = "",
	wrapperClassname = "",
	children,
	searchButtonContent = <InlineSvgs.search className={styles.icon} />,
	searchButtonProps,
	showSearchBtn = true,
	variant = "default",
	onFocus,
	onBlur,
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
			onSubmit={handleSubmit}
			className={`${styles[`form_${variant}`]} ${isFocused ? styles.active : ""} ${wrapperClassname}`}
		>
			{children}
			<input
				className={`${styles.input} ${className}`}
				type="text"
				value={query}
				ref={inputRef}
				onChange={handleChange}
				placeholder={placeholder}
				onFocus={(e) => {
					setIsFocused(true);
					onFocus?.(e);
				}}
				onBlur={(e) => {
					setIsFocused(false);
					onBlur?.(e);
				}}
				{...props}
			/>
			{showSearchBtn && (
				<Button
					variant="transparent"
					type="submit"
					{...searchButtonProps}
					className={`${styles.btn} ${searchButtonProps?.className}`}
					onClick={(e) => {
						handleSubmit(e);
						searchButtonProps?.onClick?.(e);
					}}
				>
					{searchButtonContent}
				</Button>
			)}
		</form>
	);
};

export default SearchBar;
