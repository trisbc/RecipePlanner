import { RecipeStoreState, RecipeType } from "@/types";
import { createStore, useStore } from "zustand";


type RecipeStoreActions = {
    setRecipeState: (nextState: RecipeStoreState) => void;
    addRecipe: (recipeKey: string, recipe: RecipeType) => void;
    removeRecipe: (recipeKey: string) => void;
  }

type RecipeStore =  { recipeStore: RecipeStoreState } & RecipeStoreActions

export const settingsStore = createStore<RecipeStore>()((set) => ({
    // setters 
    setRecipeState: (recipeStore) => set((prevState) => ({...prevState, recipeStore})),
    addRecipe: (recipeKey, recipe) => set((prevState) => ({...prevState, recipeStore: {...prevState.recipeStore, [recipeKey]: recipe}})),
    removeRecipe: (recipeKey) => set((prevState) => {
        const { [recipeKey]: _deleteRecipe, ...newStore } = prevState.recipeStore 
        return {...prevState, recipeStore: newStore}}),
    recipeStore: {}
}))

// TODO: Remove this once done
const mockRecipeStore: Record<string, RecipeType> = {
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

export const useRecipeStore = () => {
    const { recipeStore, ...recipeStoreActions} = useStore(settingsStore)
    //TODO: add helper functions here as needed
    return { recipeStore: {...recipeStore, ...mockRecipeStore}, ...recipeStoreActions }
}

