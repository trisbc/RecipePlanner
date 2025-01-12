import { RecipeType } from "@/types/recipeType";
import { createStore, useStore } from "zustand";

export type DayState = {
    day: string;
    recipes: (string | null)[]
}
interface CalendarStoreState extends Record<string, unknown> { 
    sunday: DayState
    monday: DayState
    tuesday: DayState
    wednesday: DayState
    thursday: DayState
    friday: DayState
    saturday: DayState
    drawer: string[]
}
export type days = keyof Omit<CalendarStoreState, "drawer">

type CalendarStoreActions = {
    setCalendarState: (nextState: CalendarStoreState) => void
    setDrawer: (nextState: string[]) => void
    setDay: (dayKey: days, DayState: (string | null)[]) => void
  }

type CalendarStore =  CalendarStoreState & CalendarStoreActions

export const calendarStore = createStore<CalendarStore>()((set) => ({
    sunday: {day: "sunday", recipes: []},
    monday: {day: "monday", recipes: []},
    tuesday: {day: "tuesday", recipes: []},
    wednesday: {day: "wednesday", recipes: []},
    thursday: {day: "thursday", recipes: []},
    friday: {day: "friday", recipes: []},
    saturday: {day: "saturday", recipes: []},
    drawer: [
        "potatoSoup",
        "brocSoup",
        "tomatoSoup",
        "chickenSoup",
        "carrotSoup",
        "lentilSoup",
        "butternutSoup",
        "frenchOnionSoup",
        "misoSoup",
        "splitPeaSoup",
        "minestroneSoup",
        "clamChowder"
    ],
    // setters 
    setCalendarState: (nextState) => set((prevState) => ({...prevState, nextState})),
    setDay: (day, recipes) => set((prevState) => ({ ...prevState, [day]: {...prevState[day] as DayState, recipes }})),
    setDrawer: (nextRecipes) => set({ drawer: nextRecipes })
}))


export const useCalendarStore = () => {
    const { setCalendarState, setDay, setDrawer, ...store } = useStore(calendarStore)

    const moveRecipe = (recipe: string, moveTo: { day: days, index: number}, moveFrom?: { day: days, index: number}) => {
        const isSameDay = (moveFrom?.day === moveTo.day)
        if (isSameDay) {
            const newIndex = moveFrom.index < moveTo.index ?  moveTo.index - 1 : moveTo.index
            const currentDay = store[moveFrom.day] as DayState;
            const currentDayRecipes = [...currentDay.recipes];
            //deleteIndex
            currentDayRecipes.splice(moveFrom.index, 1);
            currentDayRecipes.splice(newIndex, 0, recipe)
            setDay(moveTo.day, currentDayRecipes.filter((value) => !!value))
            
        } else {
            if (moveFrom) {
                deleteRecipe(moveFrom.day, moveFrom.index)
            }
            addRecipe(moveTo.day, moveTo.index, recipe)
            
        }
    }

    const deleteRecipe = (day: days, index: number) => {
        const { recipes } = store[day] as DayState
        setDay(day, recipes.toSpliced(index, 1))

    }

    const nullRecipe = (day: days, index: number) => {
        const { recipes } = store[day] as DayState
        setDay(day, recipes.toSpliced(index, 1, null))
    }

    const addRecipe = (day: days, index: number, recipe: string) => {
        const { recipes } = store[day] as DayState
        setDay(day, recipes.toSpliced(index, 0, recipe))
    }

    return { calendarStore: store, moveRecipe, deleteRecipe, nullRecipe }
}

export const recipeStore: Record<string, RecipeType> = {
    potatoSoup: {
        title: "Potato Soup",
        description: "test description that is long enough to make things do some wrapping, hahahahahhahahahah",
        cookTime: 60
    },
    brocSoup: {
        title: "Brocolli Cheddar soup",
        cookTime: 50
    },
    tomatoSoup: {
        title: "Tomato Basil Soup",
        description: "A classic comfort soup with rich tomato flavor and fresh basil.",
        cookTime: 45
    },
    chickenSoup: {
        title: "Chicken Noodle Soup",
        cookTime: 40
    },
    carrotSoup: {
        title: "Carrot Ginger Soup",
        description: "A creamy and flavorful soup made with carrots and a hint of ginger spice.",
        cookTime: 35
    },
    lentilSoup: {
        title: "Lentil Soup",
        cookTime: 55
    },
    butternutSoup: {
        title: "Butternut Squash Soup",
        description: "Smooth, creamy, and slightly sweet soup made with roasted butternut squash.",
        cookTime: 60
    },
    frenchOnionSoup: {
        title: "French Onion Soup",
        cookTime: 75
    },
    misoSoup: {
        title: "Miso Soup",
        description: "A light and umami-packed Japanese soup with tofu and seaweed.",
        cookTime: 20
    },
    splitPeaSoup: {
        title: "Split Pea Soup",
        cookTime: 50
    },
    minestroneSoup: {
        title: "Minestrone Soup",
        description: "A hearty Italian vegetable soup with pasta and beans.",
        cookTime: 60
    },
    clamChowder: {
        title: "Clam Chowder",
        cookTime: 45
    }
}