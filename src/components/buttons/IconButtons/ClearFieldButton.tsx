import { Button } from "@mantine/core";
import { FC } from "react";
import { IconButtonProps } from "./types";
import { IconButton } from "./IconButton";
import { FiX } from "react-icons/fi";

export const ClearFieldButton: FC<
	Partial<Omit<IconButtonProps, "icon">> & {}
> = ({ ariaLabel = "Clear search", variant = "gray", ...props }) => {
	return (
		<IconButton
			icon={<FiX size="16" color="white" />}
			ariaLabel={ariaLabel}
			variant={variant}
			{...props}
		/>
	);
};
