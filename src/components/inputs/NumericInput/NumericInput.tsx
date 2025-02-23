import { TextInput, TextInputProps } from "@mantine/core";
import { ChangeEventHandler, FC, FocusEventHandler } from "react";

interface NumericInputProps extends TextInputProps {
	minDecimals?: number;
	maxDecimals?: number;
}

export const NumericInput: FC<NumericInputProps> = ({
	onBlur,
	onChange,
	maxLength = 5,
	w = "64px",
	minDecimals = 0,
	maxDecimals = 2,
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
			{
				maximumFractionDigits:
					maxDecimals >= minDecimals ? maxDecimals : minDecimals,
				minimumFractionDigits: minDecimals,
			},
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
