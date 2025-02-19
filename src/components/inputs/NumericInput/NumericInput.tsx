import { TextInput, TextInputProps } from "@mantine/core";
import { ChangeEventHandler, FC, FocusEventHandler } from "react";

export const NumericInput: FC<TextInputProps> = ({
	onBlur,
	onChange,
	maxLength = 5,
	w = "64px",
	...props
}) => {
	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const cleanedString = e.target.value.replace(/[^0-9.]/g, "");
		e.target.value = cleanedString;
		if (onChange) onChange(e);
	};
	const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
		const cleanedString = e.target.value.replace(/[^0-9.]/g, "");
		if (!cleanedString) {
			e.target.value = "";
			if (onBlur) onBlur(e);
			return;
		}

		const formattedOptionAsNumber = parseFloat(cleanedString);
		const formattedNumber = formattedOptionAsNumber.toLocaleString(
			"en-US",
			{ maximumFractionDigits: 2 },
		);

		e.target.value = formattedNumber;
		if (onBlur) onBlur(e);
	};

	return (
		<TextInput
			w={w}
			onChange={handleChange}
			onBlur={handleBlur}
			maxLength={maxLength}
			{...props}
		/>
	);
};
