export type RangeInputLabel = {
	value: number;
	label?: React.ReactNode;
};

export type RangeInputProps = {
	value?: number;
	defaultValue?: number;
	min?: number;
	max?: number;
	step?: number;
	label?: string;
	unit?: string;
	markers?: RangeInputLabel[];
	showValueBubble?: boolean;
	disabled?: boolean;
	className?: string;
	onChange?: (value: number) => void;
	formatValue?: (value: number) => React.ReactNode;
	formatLabel?: (value: number) => React.ReactNode;
};
