import { Button, ButtonProps } from "@mantine/core";
import { FC, ReactElement } from "react";
import classes from "./ThemeButton.module.css";

interface ThemeButtonProps extends Omit<ButtonProps, "variant" | "children"> {
	variant:
		| "primary"
		| "primary-outline"
		| "secondary"
		| "secondary-outline"
		| "accent"
		| "primary-outline"
		| "text-only";
	text: string;
	icon?: ReactElement | false;
	iconPosition?: "left" | "right";
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ThemeButton: FC<ThemeButtonProps> = ({
	variant,
	text,
	icon,
	iconPosition = "left",
	className: classNameIn,
	...props
}) => {
	const variantClass = classes[variant];
	const className = `${variantClass}${classNameIn ? ` ${classNameIn}` : ""}`;
	return (
		<Button {...{ className, ...props }}>
			{icon && iconPosition === "left" && <>{icon}&ensp;</>}
			{text}
			{icon && iconPosition === "right" && <>&ensp;{icon}</>}
		</Button>
	);
};
