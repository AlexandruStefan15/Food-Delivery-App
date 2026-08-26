import { ComponentPropsWithoutRef, HTMLAttributes, LabelHTMLAttributes, MouseEvent, ReactNode, useEffect } from "react";

import styles from "./Modal.module.scss";

import { useIsMobile } from "../../hooks/useIsMobile";

export interface ModalProps extends Omit<ComponentPropsWithoutRef<"div">, "title" | "children"> {
	isOpen: boolean;
	onClose: () => void;
	title?: ReactNode;
	children: ReactNode;
	footer?: ReactNode;
	maxWidth?: number | string;
	closeOnBackdrop?: boolean;
	classNames?: Record<string, string>;
}

export interface ModalSubComponentProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
}

export interface ModalLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	children: ReactNode;
}

type ModalComponent = ((props: ModalProps) => ReactNode) & {
	Label: (props: ModalLabelProps) => ReactNode;
	Subtitle: (props: ModalSubComponentProps) => ReactNode;
};

const Modal = (({
	isOpen,
	onClose,
	title,
	children,
	footer,
	maxWidth = 550,
	closeOnBackdrop = true,
	className = "",
	classNames = {},
	style,
	onClick,
	...props
}: ModalProps) => {
	const isMobile = useIsMobile();

	useEffect(() => {
		if (!isOpen || !isMobile) {
			return;
		}

		const originalOverflow = document.body.style.overflow;
		const originalTouchAction = document.body.style.touchAction;

		document.body.style.overflow = "hidden";
		document.body.style.touchAction = "none";

		return () => {
			document.body.style.overflow = originalOverflow;
			document.body.style.touchAction = originalTouchAction;
		};
	}, [isOpen, isMobile]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
		// Only close when clicking the backdrop itself.
		if (closeOnBackdrop && event.target === event.currentTarget) {
			onClose();
		}
	};

	const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();

		onClick?.(event);
	};

	return (
		<div className={styles.backdrop} onClick={handleBackdropClick}>
			<div
				{...props}
				className={`${styles.modal} ${classNames.modal ?? ""} ${className}`.trim()}
				style={{
					...style,
					maxWidth,
				}}
				onClick={handleModalClick}
				role="dialog"
				aria-modal="true"
			>
				<header className={`${styles.header} ${classNames.header ?? ""}`.trim()}>
					{typeof title === "string" ? <h2>{title}</h2> : title}

					<button
						type="button"
						className={`${styles.closeBtn} ${classNames.closeBtn ?? ""}`.trim()}
						onClick={onClose}
						aria-label="Close modal"
					>
						✕
					</button>
				</header>

				<div className={`${styles.body} ${classNames.body ?? ""}`.trim()}>{children}</div>

				{footer != null && <div className={`${styles.footer} ${classNames.footer ?? ""}`.trim()}>{footer}</div>}
			</div>
		</div>
	);
}) as ModalComponent;

Modal.Label = function ModalLabel({ children, className = "", ...props }: ModalLabelProps) {
	return (
		<label {...props} className={`${styles.label} ${className}`.trim()}>
			{children}
		</label>
	);
};

Modal.Subtitle = function ModalSubtitle({ children, className = "", ...props }: ModalSubComponentProps) {
	return (
		<h2 {...props} className={`${styles.subtitle} ${className}`.trim()}>
			{children}
		</h2>
	);
};

export default Modal;
