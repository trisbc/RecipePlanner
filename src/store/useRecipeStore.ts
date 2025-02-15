import { RecipeStoreState, RecipeType } from "@/types";
import { createStore, useStore } from "zustand";


type RecipeStoreActions = {
    setRecipeState: (nextState: RecipeStoreState) => void;
    addRecipe: (recipeKey: string, recipe: RecipeType) => void;
    removeRecipe: (recipeKey: string) => void;
  }

type RecipeStore =  { recipeStore: RecipeStoreState } & RecipeStoreActions

export const recipeStore = createStore<RecipeStore>()((set) => ({
    // setters 
    setRecipeState: (recipeStore) => set((prevState) => ({...prevState, recipeStore})),
    addRecipe: (recipeKey, recipe) => set((prevState) => ({...prevState, recipeStore: {...prevState.recipeStore, [recipeKey]: recipe}})),
    removeRecipe: (recipeKey) => set((prevState) => {
        const { [recipeKey]: _deleteRecipe, ...newStore } = prevState.recipeStore 
        return {...prevState, recipeStore: newStore}}),
    recipeStore: {}
}))

export const useRecipeStore = () => {
    const { recipeStore: store, ...recipeStoreActions} = useStore(recipeStore)
    //TODO: add helper functions here as needed
    return { recipeStore: store, ...recipeStoreActions }
}

