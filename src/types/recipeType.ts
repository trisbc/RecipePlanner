
export type units = 'mg' | 'g' | 'kg' | 'oz' | 'lb' | 'ml' | 'l' | 'cup' | 'pint' | 'quart' | 'gallon';
export interface IngredientType {
    item: string;
    unit?: units;
    costPerUnit?: Record<units, number>;
}

export interface RecipeType {
    title: string;
    description?: string; 
    /** Time to cook in seconds */
    cookTime?: number;
    /** Time to prep in seconds */
    prepTime?: number;
    /** List of ingredients */
    ingredients?: {quantity: number, ingredientID: string, unit: units}[]
}