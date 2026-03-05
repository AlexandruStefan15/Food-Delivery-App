import styles from "./index.module.scss";
import cart from "./cart.svg";
import logo from "./logo.svg";

const svgs = { cart, logo };

export default svgs;

type InlineSvgProps = React.ComponentPropsWithoutRef<"svg"> & {
	wrapperProps?: React.ComponentPropsWithoutRef<"div">;
};

export const inline_svgs = {
	search: ({ wrapperProps, ...props }: InlineSvgProps) => (
		<div className={styles.searchSvgWrapper} {...wrapperProps}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				width="800px"
				height="800px"
				viewBox="0 0 48 48"
				{...props}
			>
				<title>search</title>
				<g id="Layer_2" data-name="Layer 2">
					<g id="invisible_box" data-name="invisible box">
						<rect width="48" height="48" fill="none" />
					</g>
					<g id="icons_Q2" data-name="icons Q2">
						<path
							d="M30.9,28.1a14.8,14.8,0,0,0,3-10.9A15.2,15.2,0,0,0,20.1,4a15,15,0,0,0-3,29.9,15.3,15.3,0,0,0,11-2.9L40.6,43.4a1.9,1.9,0,0,0,2.8,0h0a1.9,1.9,0,0,0,0-2.8ZM20.8,29.9A11,11,0,0,1,8.2,17.1a10.8,10.8,0,0,1,8.9-8.9A10.9,10.9,0,0,1,29.8,20.9,11.1,11.1,0,0,1,20.8,29.9Z"
							fill="currentColor"
							stroke="currentColor"
							strokeWidth="0.5"
						/>
					</g>
				</g>
			</svg>
		</div>
	),

	cart: ({ wrapperProps, ...props }: InlineSvgProps) => (
		<div className={styles.cartSvgWrapper} {...wrapperProps}>
			<svg
				width="24px"
				height="24px"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				{...props}
			>
				<circle cx="16.5" cy="18.5" r="1.5" />
				<circle cx="9.5" cy="18.5" r="1.5" />
				<path
					d="M18 16H8a1 1 0 0 1-.958-.713L4.256 6H3a1 1 0 0 1 0-2h2a1 1 0 0 1 .958.713L6.344 6H21a1 1 0 0 1 .937 1.352l-3 8A1 1 0 0 1 18 16zm-9.256-2h8.563l2.25-6H6.944z"
					fill="currentColor"
				/>
			</svg>
		</div>
	),
};
