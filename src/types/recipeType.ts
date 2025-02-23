export type weightUnits = "mg" | "g" | "kg" | "oz" | "lb";
export type volumeUnits =
	| "ml"
	| "l"
	| "cup"
	| "pint"
	| "quart"
	| "gallon"
	| "tsp"
	| "tbsp";
export type units = weightUnits | volumeUnits;

export interface IngredientType {
	item: string;
	costPerUnit?: Partial<Record<units, number>>;
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
