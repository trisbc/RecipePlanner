import { Modal, Group, Text, Box, TextInput, Button } from "@mantine/core";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { dayType } from "@/types";
import classes from "./AddRecipeModal.module.css";
import { RecipeCardCheckBox } from "@/components/cards/RecipeCard/RecipeCard";
import { useCalendarStore, useRecipeStore } from "@/store";
import { FiPlus, FiX } from "react-icons/fi";
import { ThemeButton } from "@/components/buttons/ThemeButton";
import { ClearFieldButton } from "@/components/buttons/IconButtons/ClearFieldButton";

const { addRecipeModal, recipeContainer, clearFieldButton } = classes;

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
		onClose();
		setFilterString("");
		setSelectedRecipes([]);
	};

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
			<SearchBox isOpen={isOpen} onFilter={setFilterString} />
			<ResultsBox
				filterString={filterString}
				selectedRecipes={selectedRecipes}
				selectRecipe={selectRecipe}
			/>
			<Group mt="sm">
				<ThemeButton
					variant="primary"
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
						variant="primary-outline"
						onClick={() => setSelectedRecipes([])}
						text="Clear selection"
					/>
				)}
			</Group>
		</Modal>
	);
};

interface SearchBoxProps {
	isOpen: boolean;
	onFilter: (filterString: string) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ isOpen, onFilter }) => {
	const [searchBy, setSearchBy] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	useEffect(() => {
		const handler = setTimeout(() => {
			onFilter(searchBy);
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [searchBy]);

	const clearSearch = () => {
		setSearchBy("");
		onFilter("");
	};

	return (
		<TextInput
			aria-label="Search for recipe by Title or Description"
			placeholder="Search by title or description"
			ref={inputRef}
			value={searchBy}
			onChange={(event) => setSearchBy(event.currentTarget.value)}
			rightSection={<ClearFieldButton onClick={clearSearch} />}
		/>
	);
};

interface ResultsBoxProps {
	filterString: string;
	selectedRecipes: string[];
	selectRecipe: (id: string) => void;
}

const ResultsBox: FC<ResultsBoxProps> = ({
	filterString,
	selectedRecipes,
	selectRecipe,
}) => {
	const { recipeStore } = useRecipeStore();
	const recipeKeys = Object.keys(recipeStore);

	const searchResults = useMemo(() => {
		return recipeKeys.filter((key) => {
			const recipe = recipeStore[key];
			return (
				recipe.title
					.toLowerCase()
					.includes(filterString.toLowerCase()) ||
				(recipe.description &&
					recipe.description
						.toLowerCase()
						.includes(filterString.toLowerCase()))
			);
		});
	}, [filterString, recipeKeys]);

	return (
		<Box className={recipeContainer}>
			{searchResults.length === 0 ? (
				<Box p="lg" w="100%">
					<Text ta="center" c="white">
						{recipeKeys.length === 0
							? "No recipes found. Add some recipes to your RecipeBook."
							: "No recipes match your search. Please try again."}
					</Text>
				</Box>
			) : (
				searchResults.map((key) => (
					<RecipeCardCheckBox
						selected={selectedRecipes.includes(key)}
						onClick={selectRecipe}
						id={key}
					/>
				))
			)}
		</Box>
	);
};
