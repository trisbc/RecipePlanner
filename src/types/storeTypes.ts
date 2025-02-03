import { IngredientType, RecipeType } from "./recipeType";

export type DayState = (string | null)[]

export interface CalendarStoreState extends Record<string, unknown> { 
    sunday: DayState
    monday: DayState
    tuesday: DayState
    wednesday: DayState
    thursday: DayState
    friday: DayState
    saturday: DayState
    drawer: string[]
}

export type RecipeStoreState = Record<string, RecipeType> 

export type IngredientStoreState = Record<string, IngredientType>