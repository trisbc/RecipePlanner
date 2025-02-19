import {
	Modal,
	Group,
	Stack,
	TextInput,
	Select,
	Autocomplete,
} from "@mantine/core";
import { FC, FocusEvent, useState } from "react";
import classes from "./IngredientModal.module.css";
import { useIngredientStore } from "@/store";
import { ThemeButton } from "@/components/buttons/ThemeButton";
import { IngredientType, volumeUnits, weightUnits } from "@/types";
import { createKey } from "@/util/createKey";

const { ingredientModal, amountField } = classes;

interface CreateRecipeModalProps {
	isOpen: boolean;
	isEditing: boolean;
	onClose: (isOpen: false) => void;
	onAddIngredient: (recipeKey: string) => void;
}

interface costState {
	weight: {
		cost: string;
		unit: weightUnits | "";
	};
	volume: {
		cost: string;
		unit: volumeUnits | "";
	};
}

const blankCosts: costState = {
	weight: {
		cost: "",
		unit: "",
	},
	volume: {
		cost: "",
		unit: "",
	},
};

export const IngredientModal: FC<CreateRecipeModalProps> = ({
	isOpen,
	onClose,
	isEditing,
	onAddIngredient,
}) => {
	const hasChanges = true;
	const { addIngredient, ingredientStore } = useIngredientStore();
	const [ingredientName, setIngredientName] = useState("");
	const [category, setCategory] = useState("");
	const [nameError, setNameError] = useState("");
	const [costs, setCosts] = useState<costState>(blankCosts);
	const setCostOpt = (
		type: keyof costState,
		field: keyof costState["volume"],
		value: string,
	) => {
		setCosts((prev) => ({
			...prev,
			[type]: { ...prev[type], [field]: value },
		}));
	};

	const handleAmountBlur = (
		type: keyof costState,
		field: keyof costState["volume"],
		event: FocusEvent<HTMLInputElement, Element>,
	) => {
		const cleanedString = event.target.value.replace(/[^0-9.]/g, "");
		if (!cleanedString) return;

		const formattedOptionAsNumber = parseFloat(cleanedString);
		const formattedNumber = formattedOptionAsNumber.toLocaleString(
			"en-US",
			{ maximumFractionDigits: 2 },
		);
		setCostOpt(type, field, formattedNumber);
	};

	const validateForm = () => {
		setNameError("");
		if (!ingredientName) {
			setNameError("Please enter an ingredient to continue.");
			return false;
		}
		return true;
	};

	const clearForm = () => {
		setIngredientName("");
		setNameError("");
		setCosts(blankCosts);
	};

	const ingredientKey = createKey(ingredientName);

	const handleSubmit = () => {
		if (!validateForm()) return;

		const ingredient: IngredientType = {
			item: ingredientName,
			category: category ? category : undefined,
		};

		addIngredient(ingredientKey, ingredient);
		onAddIngredient(ingredientKey);
	};

	const categoryArray = Object.values(ingredientStore)
		.filter(({ category }) => !!category)
		.map(({ category }) => category as string);

	return (
		<Modal
			opened={isOpen}
			onClose={() => onClose(false)}
			withCloseButton={false}
			yOffset="10%"
			size="lg"
			className={ingredientModal}
			keepMounted={false}
		>
			<Stack gap="sm">
				<TextInput
					label="Ingredient"
					w="220px"
					value={ingredientName}
					onChange={(e) => {
						setIngredientName(e.target.value);
					}}
					onBlur={validateForm}
					error={nameError}
				/>
				<Autocomplete
					label="Category"
					w="170px"
					value={category}
					onChange={(e) => {
						setCategory(e);
					}}
					data={[...new Set(categoryArray)]}
				/>
				Cost by weight
				<Group>
					<TextInput
						leftSection="$"
						className={amountField}
						label="Cost"
						w="120px"
						value={costs.weight.cost}
						onChange={(e) =>
							setCostOpt("weight", "cost", e.target.value)
						}
						onBlur={(e) => handleAmountBlur("weight", "cost", e)}
						maxLength={8}
					/>
					<Select
						clearable
						label="Unit"
						w="120px"
						searchable
						value={costs.weight.unit}
						onChange={(item) => {
							if (item) setCostOpt("weight", "unit", item);
						}}
						data={["mg", "g", "kg", "oz", "lb"]}
					/>
				</Group>
				Cost by volume
				<Group>
					<TextInput
						className={amountField}
						label="Cost"
						leftSection="$"
						w="120px"
						value={costs.volume.cost}
						onChange={(e) =>
							setCostOpt("volume", "cost", e.target.value)
						}
						onBlur={(e) => handleAmountBlur("volume", "cost", e)}
						maxLength={8}
					/>
					<Select
						clearable
						label="Unit"
						w="120px"
						searchable
						value={costs.volume.unit}
						onChange={(item) => {
							if (item) setCostOpt("volume", "unit", item);
						}}
						data={["ml", "l", "cup", "pint", "quart", "gallon"]}
					/>
				</Group>
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
