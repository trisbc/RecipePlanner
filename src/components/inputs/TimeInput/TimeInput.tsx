import { formatTime, parseTime } from "@/util/parseTime";
import { TextInput, TextInputProps } from "@mantine/core";
import { ChangeEventHandler, FC, FocusEventHandler } from "react";

interface TimeInputProps extends TextInputProps {}

export const TimeInput: FC<TimeInputProps> = ({
	onBlur,
	onChange,
	maxLength = 5,
	w = "64px",
	...props
}) => {
	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const value = e.target.value.replace(/[^0-9]/g, "");
		let formattedValue = value;

		if (value.length > 2) {
			formattedValue = `${value.slice(0, -2)}:${value.slice(-2)}`;
		}

		e.target.value = formattedValue;
		if (onChange) onChange(e);
	};
	const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
		const value = e.target.value;
		if (!value) {
			if (onBlur) onBlur(e);
			return;
		}
		const totalMinutes = parseTime(value);
		e.target.value = formatTime(totalMinutes);
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
