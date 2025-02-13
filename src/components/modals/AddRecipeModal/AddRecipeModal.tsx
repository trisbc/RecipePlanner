import { Modal, Tabs, Group, Text, Box, Title, TextInput } from "@mantine/core";
import { FC, useEffect, useRef } from "react";
import { dayType } from "@/types";
import classes from "./AddRecipeModal.module.css";
import { RecipeCard, RecipeCardNoDragging } from "@/components/cards";
import { RecipeCardCheckBox } from "@/components/cards/RecipeCard/RecipeCard";

const { addRecipeModal, recipeContainer } = classes;

interface AddRecipeModalProps {
	isOpen: boolean;
	onClose: () => void;
	day: dayType;
}

export const AddRecipeModal: FC<AddRecipeModalProps> = ({
	isOpen,
	onClose,
	day,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			withCloseButton={false}
			radius="15px"
			size="lg"
			padding={0}
			className={addRecipeModal}
			bg="var(--secondary-color-4)"
			yOffset="10%"
		>
			<TextInput
				aria-label="Search for recipes"
				placeholder="Search for recipe"
				ref={inputRef}
			/>
			<Box className={recipeContainer}>
				<RecipeCardCheckBox />

				<RecipeCardCheckBox />

				<RecipeCardCheckBox />

				<RecipeCardCheckBox />
			</Box>
		</Modal>
	);
};
