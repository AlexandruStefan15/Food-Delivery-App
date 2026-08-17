import React, {
	useState,
	useRef,
	useEffect,
	ComponentPropsWithoutRef,
	FormEvent,
	ChangeEvent,
	MouseEvent,
	ReactNode,
} from "react";
import styles from "./Form.module.scss";
import { NavLink, LinkProps } from "react-router";
import Button from "../Button/Button";

// --- Types & Interfaces ---

export interface FormData {
	email_or_phone?: string;
	email?: string;
	password?: string;
	[key: string]: any;
}

export interface FormProps extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit"> {
	data?: Partial<FormData>;
	onSubmit?: (event: FormEvent<HTMLFormElement>, data: FormData) => void;
}

export interface FormTitleProps extends ComponentPropsWithoutRef<"h1"> {}

export interface FormGroupProps extends ComponentPropsWithoutRef<"div"> {}

export interface FormInputProps extends ComponentPropsWithoutRef<"input"> {
	variant?: string;
}

export interface FormLabelProps extends ComponentPropsWithoutRef<"label"> {}

export interface FormFooterProps extends ComponentPropsWithoutRef<"div"> {}

export interface FormTextProps extends ComponentPropsWithoutRef<"p"> {}

export interface FormNavLinkProps extends ComponentPropsWithoutRef<typeof NavLink> {}

export interface FormButtonProps extends ComponentPropsWithoutRef<typeof Button> {}

export interface FormRememberMeProps extends ComponentPropsWithoutRef<"div"> {
	name?: string;
	id?: string;
}

export interface FormRecaptchaProps extends ComponentPropsWithoutRef<"div"> {}

// --- Main Form Component ---

export default function Form({ className = "", data, children, onSubmit, ...props }: FormProps) {
	const [invalidInputs, setInvalidInputs] = useState<Record<string, boolean>>({});
	const [formData, setFormData] = useState<FormData>({
		email: "",
		password: "",
		...data,
	});

	const formRef = useRef<HTMLFormElement>(null);

	function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault();
		if (onSubmit) onSubmit(event, formData);
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		setInvalidInputs((prev) => ({
			...prev,
			[name]: false,
		}));
	};

	if (children) {
		return (
			<form ref={formRef} className={`${styles.form} ${className}`} onSubmit={handleSubmit} {...props}>
				{children}
			</form>
		);
	}
}

// --- Sub-components ---

Form.Title = function Form_Title({ className = "", children, ...props }: FormTitleProps) {
	return (
		<h1 className={`${styles.title} ${className}`} {...props}>
			{children}
		</h1>
	);
};

Form.Group = function Form_Group({ className = "", children, ...props }: FormGroupProps) {
	return (
		<div className={`${styles.group} ${className}`} {...props}>
			{children}
		</div>
	);
};

Form.FormInput = function Form_FormInput({ className = "", children, variant = "2", ...props }: FormInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const input = inputRef.current;
		if (!input) return;
	}, []);

	return <input ref={inputRef} className={`${styles.formInput} ${className}`} {...props} />;
};

Form.Label = function Form_Label({ className = "", children, ...props }: FormLabelProps) {
	return (
		<label className={`${styles.placeholder} ${className}`} {...props}>
			{children}
		</label>
	);
};

Form.Footer = function Form_Footer({ className = "", children, ...props }: FormFooterProps) {
	return (
		<div className={`${styles.footer} ${className}`} {...props}>
			{children}
		</div>
	);
};

Form.Text = function Form_Text({ className = "", children, ...props }: FormTextProps) {
	return (
		<p className={`${styles.text} ${className}`} {...props}>
			{children}
		</p>
	);
};

Form.NavLink = function Form_NavLink({ className = "", children, to = "#", ...props }: FormNavLinkProps) {
	return (
		<NavLink className={`${styles.navLink} ${className}`} to={to} {...props}>
			{children}
		</NavLink>
	);
};

Form.Button = function Form_Button({ className = "", children, ...props }: FormButtonProps) {
	return (
		<Button className={`${styles.button} ${className}`} {...props}>
			{children}
		</Button>
	);
};

Form.RememberMe = function Form_RememberMe({ className = "", children, name, id, ...props }: FormRememberMeProps) {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	function handleClick() {
		setIsChecked((prev) => !prev);
	}

	return (
		<div className={`${styles.rememberMe} ${className}`} {...props}>
			{children || (
				<>
					<input onChange={handleClick} name={name} id={id} type="checkbox" checked={isChecked} />
					<label onClick={handleClick} htmlFor={name}>
						Remember me
					</label>
				</>
			)}
		</div>
	);
};
