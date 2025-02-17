import { Modal, Group } from "@mantine/core";
import { FC, useState } from "react";
import { dayType } from "@/types";
import classes from "./CreateRecipeModal.module.css";
import { useCalendarStore } from "@/store";
import { FiPlus } from "react-icons/fi";
import { ThemeButton } from "@/components/buttons/ThemeButton";

const { createRecipeModal } = classes;

interface CreateRecipeModalProps {
	isOpen: boolean;
	onClose: (isOpen: false) => void;
}

export const CreateRecipeModal: FC<CreateRecipeModalProps> = ({
	isOpen,
	onClose,
}) => {
	const [filterString, setFilterString] = useState("");
	const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
	const { addRecipes } = useCalendarStore();

	const selectRecipe = (id: string) => {
		if (selectedRecipes.includes(id)) {
			setSelectedRecipes((prev) =>
				prev.filter((recipeId) => recipeId !== id),
			);
		} else {
			setSelectedRecipes((prev) => [...prev, id]);
		}
	};

	const onAdd = () => {
		if (selectedRecipes.length) addRecipes(day, selectedRecipes);
		onClose(false);
		setFilterString("");
		setSelectedRecipes([]);
	};

	return (
		<Modal
			opened={isOpen}
			onClose={() => onClose(false)}
			withCloseButton={false}
			yOffset="10%"
			size="lg"
			className={createRecipeModal}
		>
			<Group mt="sm">
				<ThemeButton
					variant="accent"
					onClick={onAdd}
					icon={!!selectedRecipes.length && <FiPlus size="16" />}
					text={
						selectedRecipes.length
							? `Add ${selectedRecipes.length} recipe${selectedRecipes.length !== 1 ? "s" : ""}`
							: "Close"
					}
				/>
				{!!selectedRecipes.length && (
					<ThemeButton
						variant="accent-outline"
						onClick={() => setSelectedRecipes([])}
						text="Clear selection"
					/>
				)}
			</Group>
		</Modal>
	);
};
