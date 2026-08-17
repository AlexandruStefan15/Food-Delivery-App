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
import { InlineSvgs } from "../../assets/svgs";

// --- Types ---

export interface AccordionDataItem {
	id: string | number;
	label: string;
	details: Record<string, string>;
}

interface AccordionContextType {
	itemSelected: number | null;
	setItemSelected: React.Dispatch<React.SetStateAction<number | null>>;
}

interface ItemContextType {
	index: number;
}

// Contexts
const AccordionContext = createContext<AccordionContextType | null>(null);
const ItemContext = createContext<ItemContextType | null>(null);

// Component Props (using ComponentPropsWithoutRef)
export interface AccordionProps extends ComponentPropsWithoutRef<"ul"> {
	data?: AccordionDataItem[];
}

export interface AccordionItemProps extends ComponentPropsWithoutRef<"li"> {
	index?: number;
}

export interface AccordionLabelProps extends ComponentPropsWithoutRef<"div"> {}

export interface AccordionDetailsProps extends ComponentPropsWithoutRef<"div"> {}

export interface AccordionTextProps extends ComponentPropsWithoutRef<"p"> {}

export interface AccordionIconProps extends ComponentPropsWithoutRef<"span"> {
	src?: string;
	alt?: string;
}

export default function Accordion({ className = "", children, ...props }: AccordionProps) {
	const [itemSelected, setItemSelected] = useState<number | null>(null);

	let items: ReactNode = Children.map(children, (child, index) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { index } as AccordionItemProps);
		}
		return child;
	});

	return (
		<AccordionContext.Provider value={{ itemSelected, setItemSelected }}>
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

Accordion.Label = function Accordion_Label({ className = "", children, ...props }: AccordionLabelProps) {
	const accordionCtx = useContext(AccordionContext);
	const itemCtx = useContext(ItemContext);

	if (!accordionCtx || !itemCtx) {
		throw new Error("Accordion.Label must be rendered within Accordion and Accordion.Item");
	}

	const { itemSelected, setItemSelected } = accordionCtx;
	const { index } = itemCtx;

	function handleClick(e: MouseEvent<HTMLDivElement>, i: number) {
		setItemSelected((prev) => (prev === i ? null : i));
	}

	return (
		<div className={`${styles.label} ${className}`} onClick={(event) => handleClick(event, index)} {...props}>
			{children}
		</div>
	);
};

Accordion.Details = function Accordion_Details({ children, className = "", ...props }: AccordionDetailsProps) {
	const accordionCtx = useContext(AccordionContext);
	const itemCtx = useContext(ItemContext);

	if (!accordionCtx || !itemCtx) {
		throw new Error("Accordion.Details must be rendered within Accordion and Accordion.Item");
	}

	const { itemSelected } = accordionCtx;
	const { index } = itemCtx;
	const el = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!el.current) return;

		if (itemSelected === index) {
			el.current.classList.add(styles.active);
		} else {
			el.current.classList.remove(styles.active);
		}
	}, [itemSelected, index]);

	return (
		<div className={`${styles.details} ${className}`} ref={el} {...props}>
			{children}
		</div>
	);
};

Accordion.Text = function Accordion_Text({ className = "", children, ...props }: AccordionTextProps) {
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
