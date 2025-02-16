import { MantineStyleProps } from "@mantine/core";
import { ReactElement } from "react";

export interface IconButtonProps extends MantineStyleProps {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	ariaLabel: string;
	icon: ReactElement;
	variant?: "icon-only" | "primary" | "secondary" | "accent" | "gray";
}
