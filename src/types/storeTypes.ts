import { colorsType } from ".";
import { dayType, numDaysType } from "./argTypes";
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

export interface SettingsState extends Record<string, unknown> {
    useDraggable: boolean;
    appearance: {
        colorScheme: "auto" | "light" | "dark";
        primaryColor: colorsType;
        secondaryColor: colorsType;
        accentColor: colorsType;
    }
    calendar: {
        numDays: numDaysType;
        startDay: dayType;
    }
    fileInfo: {
        recipeBook: number;
        timeStamp: number;
        filename: string;
    }
}

export type RecipeStoreState = Record<string, RecipeType> 

export type IngredientStoreState = Record<string, IngredientType>

export interface RecipeBookFile {
    recipeBook: number;
    timeStamp: number;
    filename: string;
    calendarState: CalendarStoreState;
    recipeState: Record<string, RecipeType>;
    ingredientState: Record<string, IngredientType>;
    settingsState: Omit<SettingsState, "fileInfo">;
}
