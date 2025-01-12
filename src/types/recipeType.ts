export interface IngedientType {
    item: string;
    cost: number;
    quantity: number;
    unit: string;
}

export interface RecipeType {
    title: string;
    description?: string; 
    /** Time to cook in seconds */
    cookTime?: number;
    /** Time to prep in seconds */
    prepTime?: number;
    /** List of ingredients */
    ingredients?: IngedientType[]
}
