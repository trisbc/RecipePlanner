import { Button } from "@mantine/core";
import { FC } from "react";
import { IconButtonProps } from "./types";
import classes from "./IconButtons.module.css";

export const IconButton: FC<IconButtonProps> = ({
	onClick,
	ariaLabel,
	icon,
	variant,
}) => {
	const variantClass = classes[variant];

	return (
		<Button
			aria-label={ariaLabel}
			onClick={onClick}
			className={variantClass}
		>
			{icon}
		</Button>
	);
};
