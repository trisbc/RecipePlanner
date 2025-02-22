import {
	Modal,
	Group,
	Stack,
	TextInput,
	Select,
	Textarea,
	Box,
} from "@mantine/core";
import { ChangeEvent, FC, FocusEvent, useEffect, useState } from "react";
import classes from "./CreateRecipeModal.module.css";
import { useIngredientStore, useRecipeStore } from "@/store";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { ThemeButton } from "@/components/buttons/ThemeButton";
import { TimeInput } from "@/components/inputs/TimeInput";
import { RecipeType, units } from "@/types";
import { parseTime } from "@/util/parseTime";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { createKey } from "@/util/createKey";
import { IngredientModal } from "../IngredientModal/IngredientModal";
import { useGroupedIngredients } from "./util";

const { createRecipeModal, amountField } = classes;

interface CreateRecipeModalProps {
	isOpen: boolean;
	isEditing: boolean;
	onClose: (isOpen: false) => void;
	onAddRecipe: (recipeKey: string) => void;
}

interface IngredientFieldType {
	quantity: string;
	ingredientID: string;
	unit: string;
}

const blankIngredient = {
	quantity: "",
	ingredientID: "",
	unit: "",
};

export const CreateRecipeModal: FC<CreateRecipeModalProps> = ({
	isOpen,
	onClose,
	isEditing,
	onAddRecipe,
}) => {
	const { addRecipe, recipeStore } = useRecipeStore();
	const hasChanges = true;
	const [isIngredientOpen, setIsIngredientOpen] = useState(false);
	const [recipeName, setRecipeName] = useState("");
	const [nameError, setNameError] = useState("");
	const [description, setDescription] = useState("");
	const [ingredients, setIngredients] = useState<IngredientFieldType[]>([
		blankIngredient,
	]);
	const [prepTime, setPrepTime] = useState("");
	const [cookTime, setCookTime] = useState("");

	const setIngredientOption = (
		field: keyof IngredientFieldType,
		index: number,
		value: string | number,
	) => {
		setIngredients((prev) => {
			const newIngredients = [...prev];
			newIngredients[index] = {
				...newIngredients[index],
				[field]: value,
			};
			return newIngredients;
		});
	};

	const validateForm = () => {
		setNameError("");
		if (!recipeName) {
			setNameError("Please give your recipe a name to continue.");
			return false;
		}
		return true;
	};

	const clearForm = () => {
		setRecipeName("");
		setNameError("");
		setDescription("");
		setIngredients([blankIngredient]);
		setPrepTime("");
		setCookTime("");
	};

	const recipeKey = createKey(recipeName);

	const handleSubmit = () => {
		if (!validateForm()) return;

		const preparedIngredients: RecipeType["ingredients"] = ingredients
			.filter((ingredient) => ingredient.ingredientID)
			.map(({ ingredientID, quantity, unit }) => ({
				ingredientID,
				quantity: quantity ? parseInt(quantity, 10) : undefined,
				unit: unit ? (unit as units) : undefined,
			}));

		const recipeItem: RecipeType = {
			title: recipeName,
			description: description ? description : undefined,
			ingredients: preparedIngredients.length
				? preparedIngredients
				: undefined,
			cookTime: cookTime ? parseTime(cookTime) : undefined,
			prepTime: prepTime ? parseTime(prepTime) : undefined,
		};

		addRecipe(recipeKey, recipeItem);
		onAddRecipe(recipeKey);
		clearForm();
	};

	return (
		<Modal
			opened={isOpen}
			onClose={() => {
				if (!isIngredientOpen) {
					clearForm();
					onClose(false);
				}
			}}
			withCloseButton={false}
			yOffset="10%"
			size="lg"
			className={createRecipeModal}
			keepMounted={false}
		>
			<Stack gap="sm">
				<IngredientModal
					isOpen={isIngredientOpen}
					onClose={setIsIngredientOpen}
					isEditing={false}
					onAddIngredient={() => {
						setIsIngredientOpen(false);
					}}
				/>
				<TextInput
					label="Recipe name"
					w="200px"
					value={recipeName}
					onChange={(e) => {
						setRecipeName(e.target.value);
					}}
					onBlur={validateForm}
					error={nameError}
				/>
				<Textarea
					autosize
					label="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<IngredientStack
					ingredients={ingredients}
					onDeleteIngredient={(index) =>
						setIngredients((prev) =>
							prev.filter((_, i) => i !== index),
						)
					}
					onAddIngredient={() => {
						setIngredients([...ingredients, blankIngredient]);
					}}
					onUpdateIngredients={setIngredientOption}
					onCreateIngredient={() => setIsIngredientOpen(true)}
				/>
				<Stack gap="8px">
					Time
					<Group>
						<TimeInput
							label="Prep time"
							value={prepTime}
							onChange={(e) => setPrepTime(e.target.value)}
							onBlur={(e) => setPrepTime(e.target.value)}
						/>
						<TimeInput
							label="Cook time"
							value={cookTime}
							onChange={(e) => setCookTime(e.target.value)}
							onBlur={(e) => setCookTime(e.target.value)}
						/>
					</Group>
				</Stack>
				<Group mt="lg">
					<ThemeButton
						variant="accent"
						text={
							hasChanges
								? `${isEditing ? "Save" : "Create"} recipe`
								: "Close"
						}
						onClick={handleSubmit}
					/>
					{hasChanges && (
						<ThemeButton
							variant="accent-outline"
							text="Cancel"
							onClick={() => {
								clearForm();
								onClose(false);
							}}
						/>
					)}
				</Group>
			</Stack>
		</Modal>
	);
};

interface IngredientStackProps {
	ingredients: IngredientFieldType[];
	onAddIngredient: () => void;
	onDeleteIngredient: (index: number) => void;
	onUpdateIngredients: (
		field: keyof IngredientFieldType,
		index: number,
		value: string | number,
	) => void;
	onCreateIngredient: () => void;
}

const IngredientStack: FC<IngredientStackProps> = ({
	ingredients,
	onAddIngredient,
	onDeleteIngredient,
	onUpdateIngredients,
	onCreateIngredient,
}) => {
	const handleAmountChange = (
		event: ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const cleanedString = event.target.value.replace(/[^0-9.]/g, "");

		onUpdateIngredients("quantity", index, cleanedString);
	};

	const handleAmountBlur = (
		event: FocusEvent<HTMLInputElement, Element>,
		index: number,
	) => {
		const cleanedString = event.target.value.replace(/[^0-9.]/g, "");
		if (!cleanedString) return;

		const formattedOptionAsNumber = parseFloat(cleanedString);
		const formattedNumber = formattedOptionAsNumber.toLocaleString(
			"en-US",
			{ maximumFractionDigits: 2 },
		);
		onUpdateIngredients("quantity", index, formattedNumber);
	};

	const { isSmallScreen } = useBreakpoints();
	const ingredientOptions = useGroupedIngredients();

	return (
		<Stack gap="8px">
			Ingredients
			{ingredients.map((ingredient, index) => (
				<>
					<Group key={`ingredient-row-${index}`}>
						<Select
							label={`Ingredient${ingredients.length > 1 ? ` ${index + 1}` : ""}`}
							searchable
							w={isSmallScreen ? "100%" : undefined}
							nothingFoundMessage={
								<>
									No ingredients found that match your search.
									<ThemeButton
										p={0}
										variant="text-only"
										text="＋ Create ingredient"
										onClick={() => onCreateIngredient()}
									/>
								</>
							}
							value={ingredient.ingredientID}
							onOptionSubmit={(value) => {
								if (value === "create_new") {
									onCreateIngredient();
								} else {
									onUpdateIngredients(
										"ingredientID",
										index,
										value,
									);
								}
							}}
							data={ingredientOptions}
						/>
						<TextInput
							className={amountField}
							label="Quantity"
							w="64px"
							value={ingredient.quantity}
							ta="right"
							onChange={(e) => handleAmountChange(e, index)}
							onBlur={(e) => handleAmountBlur(e, index)}
							maxLength={8}
						/>
						<Select
							clearable
							label="Unit"
							w="120px"
							searchable
							value={ingredient.unit}
							onChange={(item) => {
								if (item)
									onUpdateIngredients("unit", index, item);
							}}
							data={[
								{
									group: "Volume",
									items: [
										"ml",
										"l",
										"cup",
										"pint",
										"quart",
										"gallon",
									],
								},
								{
									group: "Weight",
									items: ["mg", "g", "kg", "oz", "lb"],
								},
							]}
						/>
						{ingredients.length > 1 && (
							<ThemeButton
								variant="text-only"
								icon={<FiTrash2 size={12} />}
								text="Remove"
								c="var(--accent-color-4)"
								fz="12px"
								mt="24px"
								p={0}
								w="fit-content"
								onClick={() => {
									onDeleteIngredient(index);
								}}
							/>
						)}
					</Group>
					{isSmallScreen && index + 1 !== ingredients.length && (
						<hr style={{ width: "100%" }} />
					)}
				</>
			))}
			<ThemeButton
				variant="text-only"
				icon={<FiPlus size={12} />}
				text="Add Ingredient"
				c="var(--accent-color-4)"
				fz="12px"
				p={0}
				w="fit-content"
				onClick={onAddIngredient}
			/>
		</Stack>
	);
};
