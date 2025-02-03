export interface IngredientType {
    item: string;
    unit?: 'mg' | 'g' | 'kg' | 'oz' | 'lb' | 'ml' | 'l' | 'cup' | 'pint' | 'quart' | 'gallon';
    costPerUnit?: number;
}

export interface RecipeType {
    title: string;
    description?: string; 
    /** Time to cook in seconds */
    cookTime?: number;
    /** Time to prep in seconds */
    prepTime?: number;
    /** List of ingredients */
    ingredients?: IngredientType & {quantity: number}[]
}

