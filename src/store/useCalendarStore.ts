import { useSaveContext } from "@/hooks";
import { CalendarStoreState, DayState } from "@/types";
import { RecipeType } from "@/types/recipeType";
import { createStore, useStore } from "zustand";

export type days = keyof Omit<CalendarStoreState, "drawer">;

type CalendarStoreActions = {
	setCalendarState: (nextState: CalendarStoreState) => void;
	setDrawer: (nextState: string[]) => void;
	setDay: (dayKey: days, DayState: DayState) => void;
};

type CalendarStore = CalendarStoreState & CalendarStoreActions;

export const calendarStore = createStore<CalendarStore>()((set) => ({
	sunday: [],
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: [],
	saturday: [],
	drawer: [],
	// setters
	setCalendarState: (nextState) =>
		set((prevState) => ({ ...prevState, ...nextState })),
	setDay: (day, recipes) =>
		set((prevState) => ({ ...prevState, [day]: recipes })),
	setDrawer: (nextRecipes) => set({ drawer: nextRecipes }),
}));

export const useCalendarStore = () => {
	const { setCalendarState, setDay, setDrawer, ...store } =
		useStore(calendarStore);
	const { performAction } = useSaveContext();

	const moveRecipe = (
		recipe: string,
		moveTo: { day: days; index: number },
		moveFrom?: { day: days; index: number },
	) => {
		performAction();
		const isSameDay = moveFrom?.day === moveTo.day;
		if (isSameDay) {
			const newIndex =
				moveFrom.index < moveTo.index ? moveTo.index - 1 : moveTo.index;
			const currentDayRecipes = store[moveFrom.day] as DayState;

			//deleteIndex
			currentDayRecipes.splice(moveFrom.index, 1);
			currentDayRecipes.splice(newIndex, 0, recipe);
			setDay(
				moveTo.day,
				currentDayRecipes.filter((value) => !!value),
			);
		} else {
			if (moveFrom) {
				deleteRecipe(moveFrom.day, moveFrom.index);
			}
			addRecipe(moveTo.day, moveTo.index, recipe);
		}
	};

	const deleteRecipe = (day: days, index: number) => {
		if (day === "drawer") return;
		performAction();
		const recipes = store[day] as DayState;
		setDay(day, recipes.toSpliced(index, 1));
	};

	const nullRecipe = (day: days, index: number) => {
		if (day === "drawer") return;
		performAction();
		const recipes = store[day] as DayState;
		setDay(day, recipes.toSpliced(index, 1, null));
	};

	const addRecipe = (day: days, index: number, recipe: string) => {
		if (day === "drawer") return;
		performAction();
		const recipes = store[day] as DayState;
		setDay(day, recipes.toSpliced(index, 0, recipe));
	};

	const addRecipes = (day: days, recipes: string[]) => {
		performAction();
		const currentRecipes = store[day] as DayState;
		setDay(day, currentRecipes.concat(recipes));
	};

	return {
		calendarStore: store,
		moveRecipe,
		deleteRecipe,
		nullRecipe,
		setCalendarState,
		addRecipes,
	};
};
