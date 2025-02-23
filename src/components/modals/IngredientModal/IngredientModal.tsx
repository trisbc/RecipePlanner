import {
	Modal,
	Group,
	Stack,
	TextInput,
	Select,
	Autocomplete,
	Text,
	Box,
	Tooltip,
} from "@mantine/core";
import { FC, FocusEvent, useState } from "react";
import classes from "./IngredientModal.module.css";
import { useIngredientStore } from "@/store";
import { ThemeButton } from "@/components/buttons/ThemeButton";
import { IngredientType, volumeUnits, weightUnits } from "@/types";
import { createKey } from "@/util/createKey";
import { NumericInput } from "@/components/inputs/NumericInput";
import { FiHelpCircle } from "react-icons/fi";

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
		setCategory("");
		setNameError("");
		setCosts(blankCosts);
	};

	const ingredientKey = createKey(ingredientName);

	const handleSubmit = () => {
		if (!validateForm()) return;

		const computedCosts: Partial<
			Record<weightUnits | volumeUnits, number>
		> = {};

		Object.values(costs).forEach(({ cost, unit }) => {
			if (cost && unit)
				computedCosts[unit as weightUnits | volumeUnits] =
					parseFloat(cost);
		});

		const ingredient: IngredientType = {
			item: ingredientName,
			category: category ? category : undefined,
			costPerUnit: Object.keys(computedCosts) ? computedCosts : undefined,
		};

		addIngredient(ingredientKey, ingredient);
		onAddIngredient(ingredientKey);
		clearForm();
	};

	const categoryArray = Object.values(ingredientStore)
		.filter(({ category }) => !!category)
		.map(({ category }) => category as string);

	return (
		<Modal
			opened={isOpen}
			onClose={() => {
				onClose(false);
				clearForm();
			}}
			withCloseButton={false}
			yOffset="6%"
			size="sm"
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
			</Stack>
			<Text mt="lg" mb="0">
				Costs{" "}
				<Tooltip
					multiline
					w="211px"
					withArrow
					arrowPosition="side"
					position="bottom-end"
					label={`The costs are used to calculate the estimated costs of a recipe. 
						    Most ingredients likely only need a weight or volume cost, 
							but you can provide both if needed.`}
				>
					<Text component="span" pt="4px">
						<FiHelpCircle
							color="var(--accent-color-4)"
							size="12px"
						/>
					</Text>
				</Tooltip>
			</Text>
			<Stack gap="sm">
				<Group gap="8px">
					<NumericInput
						leftSection="$"
						leftSectionWidth={"16px"}
						className={amountField}
						label="Cost"
						w="120px"
						value={costs.weight.cost}
						maxLength={8}
						minDecimals={2}
						onChange={(e) =>
							setCostOpt("weight", "cost", e.target.value)
						}
						onBlur={(e) =>
							setCostOpt("weight", "cost", e.target.value)
						}
					/>
					<Text mt="20px" lh="38px" fz="14px">
						per
					</Text>
					<Select
						clearable
						label="Unit (weight)"
						w="120px"
						searchable
						value={costs.weight.unit}
						onChange={(item) => {
							if (item) setCostOpt("weight", "unit", item);
						}}
						data={["mg", "g", "kg", "oz", "lb"]}
					/>
				</Group>
				<Group gap="8px">
					<NumericInput
						leftSection="$"
						leftSectionWidth={"16px"}
						className={amountField}
						label="Cost"
						w="120px"
						value={costs.volume.cost}
						maxLength={8}
						minDecimals={2}
						onChange={(e) =>
							setCostOpt("volume", "cost", e.target.value)
						}
						onBlur={(e) =>
							setCostOpt("volume", "cost", e.target.value)
						}
					/>
					<Text mt="20px" lh="38px" fz="14px">
						per
					</Text>
					<Select
						clearable
						label="Unit (volume)"
						w="120px"
						searchable
						value={costs.volume.unit}
						onChange={(item) => {
							if (item) setCostOpt("volume", "unit", item);
						}}
						data={[
							"ml",
							"l",
							"tsp",
							"tbsp",
							"cup",
							"pint",
							"quart",
							"gallon",
						]}
					/>
				</Group>
				<Group mt="lg">
					<ThemeButton
						variant="accent"
						text={
							hasChanges
								? `${isEditing ? "Save" : "Create"} ingredient`
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
