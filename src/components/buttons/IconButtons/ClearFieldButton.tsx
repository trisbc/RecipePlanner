import { Button } from "@mantine/core";
import { FC } from "react";
import { IconButtonProps } from "./types";
import { IconButton } from "./IconButton";
import { FiX } from "react-icons/fi";

interface ClearFieldButtonProps
	extends Omit<IconButtonProps, "ariaLabel" | "variant" | "icon"> {
	ariaLabel?: string;
	variant?: IconButtonProps["variant"];
}

export const ClearFieldButton: FC<ClearFieldButtonProps> = ({
	ariaLabel = "Clear search",
	variant = "gray",
	...props
}) => {
	return (
		<IconButton
			icon={<FiX size="16" color="white" />}
			ariaLabel={ariaLabel}
			variant={variant}
			{...props}
		/>
	);
};
