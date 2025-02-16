import { ReactElement } from "react";

export interface IconButtonProps {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	ariaLabel: string;
	icon: ReactElement;
	variant: "icon-only" | "primary" | "secondary" | "accent" | "gray";
}
