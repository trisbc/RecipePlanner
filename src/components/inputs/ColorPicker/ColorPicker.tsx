import { colorsType } from "@/types";
import { Box, Button, ButtonGroup, Text } from "@mantine/core";
import { FC } from "react";
import classes from "./ColorPicker.module.css";
import { FiCheck } from "react-icons/fi";
const { colorPickerBorder, colorPickerButton } = classes;
interface ColorPickerProps {
	title: string;
	selectedColor: colorsType;
	onSelectColor: (color: colorsType) => void;
}

const colors: colorsType[] = [
	"green",
	"brown",
	"cornflower",
	"deep-red",
	"olive",
	"rust",
	"mustard",
	"violet",
];

export const ColorPicker: FC<ColorPickerProps> = ({
	title,
	selectedColor,
	onSelectColor,
}) => {
	return (
		<Box maw="120px">
			<Box mx="auto" w="fit-content">
				<Text component="label" lh="32px" fz="14px" fw="500">
					{title}
				</Text>
			</Box>
			<Box className={colorPickerBorder}>
				<ButtonGroup borderWidth={5} orientation="vertical">
					{colors.map((color) => (
						<Button
							bg={`var(--mantine-color-${color}-4)`}
							onClick={() => {
								onSelectColor(color);
							}}
							className={colorPickerButton}
						>
							{color === selectedColor && <FiCheck size="24px" />}
						</Button>
					))}
				</ButtonGroup>
			</Box>
		</Box>
	);
};
