export type weightUnits = "mg" | "g" | "kg" | "oz" | "lb";
export type volumeUnits = "ml" | "l" | "cup" | "pint" | "quart" | "gallon";
export type units = weightUnits | volumeUnits;

type minUnits = "ml" | "mg";
export interface IngredientType {
	item: string;
	costPerUnit?: Partial<Record<minUnits, number>>;
	category?: string;
}

export interface RecipeType {
	title: string;
	description?: string;
	/** Time to cook in seconds */
	cookTime?: number;
	/** Time to prep in seconds */
	prepTime?: number;
	/** List of ingredients */
	ingredients?: { quantity?: number; ingredientID: string; unit?: units }[];
}
