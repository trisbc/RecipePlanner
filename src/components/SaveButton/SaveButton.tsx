import { FC, MouseEventHandler } from "react";
import { FiSave } from "react-icons/fi";
import { Button, ButtonProps } from "@mantine/core";
import classes from "./SaveButton.module.css";

const { saveButton } = classes;

interface SaveButtonProps extends ButtonProps {
	unsavedChanges?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const SaveButton: FC<SaveButtonProps> = ({
	unsavedChanges,
	...props
}) => {
	return (
		<Button className={saveButton} {...props}>
			<FiSave color="white" size="24px" />
			{unsavedChanges && (
				<span
					style={{
						position: "relative",
						top: "-8px",
						left: "-4px",
						color: "red",
						fontWeight: "bold",
					}}
				>
					*
				</span>
			)}
		</Button>
	);
};
