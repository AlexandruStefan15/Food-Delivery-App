import React, {
	useState,
	createContext,
	useContext,
	useEffect,
	useRef,
	Children,
	ComponentPropsWithoutRef,
	ReactNode,
	MouseEvent,
} from "react";
import styles from "./Accordion.module.scss";

import type {
	AccordionContextType,
	ItemContextType,
	AccordionIconProps,
	AccordionItemProps,
	AccordionProps,
} from "./Accordion.types";

// Contexts
const AccordionContext = createContext<AccordionContextType | null>(null);
const ItemContext = createContext<ItemContextType | null>(null);

export default function Accordion({ className = "", children, allowMultiple = false, ...props }: AccordionProps) {
	const [selected, setSelected] = useState<number | number[] | null>(allowMultiple ? [] : null);

	function toggleItem(index: number) {
		setSelected((prev) => {
			if (allowMultiple) {
				const currentArr = Array.isArray(prev) ? prev : [];
				return currentArr.includes(index) ? currentArr.filter((i) => i !== index) : [...currentArr, index];
			}
			return prev === index ? null : index;
		});
	}

	function isExpanded(index: number): boolean {
		if (allowMultiple && Array.isArray(selected)) {
			return selected.includes(index);
		}
		return selected === index;
	}

	let items: ReactNode = Children.map(children, (child, index) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { index } as AccordionItemProps);
		}
	});

	return (
		<AccordionContext.Provider value={{ isExpanded, toggleItem }}>
			<ul className={`${styles.accordion} ${className}`} {...props}>
				{items}
			</ul>
		</AccordionContext.Provider>
	);
}

// --- Compound Components ---

Accordion.Item = function Accordion_Item({ className = "", children, index = 0, ...props }: AccordionItemProps) {
	return (
		<ItemContext.Provider value={{ index }}>
			<li className={`${styles.item} ${className}`} {...props}>
				{children}
			</li>
		</ItemContext.Provider>
	);
};

Accordion.Label = function Accordion_Label({ className = "", children, ...props }: ComponentPropsWithoutRef<"div">) {
	const accordionCtx = useContext(AccordionContext);
	const itemCtx = useContext(ItemContext);

	if (!accordionCtx || !itemCtx) {
		throw new Error("Accordion.Label must be rendered within Accordion and Accordion.Item");
	}

	const { toggleItem } = accordionCtx;
	const { index } = itemCtx;

	function handleClick(e: MouseEvent<HTMLDivElement>) {
		toggleItem(index);
	}

	return (
		<div className={`${styles.label} ${className}`} onClick={handleClick} {...props}>
			{children}
		</div>
	);
};

Accordion.Details = function Accordion_Details({
	children,
	className = "",
	...props
}: ComponentPropsWithoutRef<"div">) {
	const accordionCtx = useContext(AccordionContext);
	const itemCtx = useContext(ItemContext);

	if (!accordionCtx || !itemCtx) {
		throw new Error("Accordion.Details must be rendered within Accordion and Accordion.Item");
	}

	const { isExpanded } = accordionCtx;
	const { index } = itemCtx;
	const el = useRef<HTMLDivElement>(null);
	const expanded = isExpanded(index);

	useEffect(() => {
		if (!el.current) return;

		if (expanded) {
			el.current.classList.add(styles.active);
		} else {
			el.current.classList.remove(styles.active);
		}
	}, [expanded]);

	return (
		<div className={`${styles.details} ${className}`} ref={el} {...props}>
			{children}
		</div>
	);
};

Accordion.DetailsContent = function Accordion_DetailsContent({
	className = "",
	children,
	...props
}: ComponentPropsWithoutRef<"div">) {
	return (
		<div className={`${styles.detailsContent} ${className}`} {...props}>
			{children}
		</div>
	);
};

Accordion.Text = function Accordion_Text({ className = "", children, ...props }: ComponentPropsWithoutRef<"p">) {
	return (
		<p className={`${styles.text} ${className}`} {...props}>
			{children}
		</p>
	);
};

Accordion.Icon = function Accordion_Icon({ className = "", children, src, alt = "", ...props }: AccordionIconProps) {
	if (src) return <img src={src} alt={alt} />;

	return (
		<span className={`${styles.icon} ${className}`} {...props}>
			{children}
		</span>
	);
};
