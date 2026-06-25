import cart from "./cart.svg";
import logo from "./logo.svg";
import logo_text_white from "./logo_text_white.svg";
import search from "./search.svg";

/* Svgs paths */
const svgs = { cart, logo, logo_text_white, search };
export default svgs;

/* Inline Svgs */
type InlineSvgProps = React.ComponentPropsWithoutRef<"svg">;

export const InlineSvgs = {
	search: ({ ...props }: InlineSvgProps) => (
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
	),

	cart: ({ ...props }: InlineSvgProps) => (
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
	),

	location: ({ ...props }: InlineSvgProps) => (
		<svg xmlns="http://www.w3.org/2000/svg" width="25" height="28" viewBox="0 0 25 28" fill="currentColor" {...props}>
			<path
				d="M12.0102 13.9999C12.5449 13.9999 13.0027 13.8096 13.3835 13.4288C13.7643 13.048 13.9546 12.5902 13.9546 12.0555C13.9546 11.5208 13.7643 11.063 13.3835 10.6822C13.0027 10.3014 12.5449 10.1111 12.0102 10.1111C11.4755 10.1111 11.0177 10.3014 10.6369 10.6822C10.2561 11.063 10.0658 11.5208 10.0658 12.0555C10.0658 12.5902 10.2561 13.048 10.6369 13.4288C11.0177 13.8096 11.4755 13.9999 12.0102 13.9999ZM12.0102 21.1458C13.9871 19.331 15.4535 17.6822 16.4095 16.1996C17.3655 14.717 17.8435 13.4004 17.8435 12.2499C17.8435 10.4837 17.2805 9.03756 16.1543 7.9114C15.0281 6.78525 13.6468 6.22217 12.0102 6.22217C10.3736 6.22217 8.99226 6.78525 7.8661 7.9114C6.73995 9.03756 6.17687 10.4837 6.17687 12.2499C6.17687 13.4004 6.65488 14.717 7.61089 16.1996C8.56691 17.6822 10.0333 19.331 12.0102 21.1458ZM12.0102 23.7222C9.4014 21.5023 7.45291 19.4403 6.16471 17.5364C4.87652 15.6325 4.23242 13.8703 4.23242 12.2499C4.23242 9.81939 5.01425 7.88305 6.57791 6.44092C8.14157 4.99879 9.95233 4.27772 12.0102 4.27772C14.0681 4.27772 15.8788 4.99879 17.4425 6.44092C19.0061 7.88305 19.788 9.81939 19.788 12.2499C19.788 13.8703 19.1439 15.6325 17.8557 17.5364C16.5675 19.4403 14.619 21.5023 12.0102 23.7222Z"
				fill="currentColor"
			/>
		</svg>
	),

	cancel: ({ ...props }: InlineSvgProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="#000000"
			width="800px"
			height="800px"
			viewBox="0 0 128 128"
			id="Layer_1"
			version="1.1"
			{...props}
		>
			<g>
				<polygon points="82.4,40 64,58.3 45.6,40 40,45.6 58.3,64 40,82.4 45.6,88 64,69.7 82.4,88 88,82.4 69.7,64 88,45.6  " />
				<path d="M1,127h126V1H1V127z M9,9h110v110H9V9z" />
			</g>
		</svg>
	),
};
