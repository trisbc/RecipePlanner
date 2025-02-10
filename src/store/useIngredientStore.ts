import { IngredientStoreState, IngredientType } from "@/types";
import { createStore, useStore } from "zustand";


type IngredientStoreActions = {
    setIngredientState: (nextState: IngredientStoreState) => void;
    addIngredient: (ingredientKey: string, ingredient: IngredientType) => void;
    removeIngredient: (ingredientKey: string) => void;
  }

type IngredientStore =  { ingredientStore: IngredientStoreState } & IngredientStoreActions

export const ingredientStore = createStore<IngredientStore>()((set) => ({
    // setters 
    setIngredientState: (ingredientStore) => set((prevState) => ({...prevState, ingredientStore})),
    addIngredient: (ingredientKey, ingredient) => set((prevState) => ({...prevState, ingredientStore: {...prevState.ingredientStore, [ingredientKey]: ingredient}})),
    removeIngredient: (ingredientKey) => set((prevState) => {
        const { [ingredientKey]: _deleteIngredient, ...newStore } = prevState.ingredientStore 

        return {...prevState, ingredientStore: newStore}}),
    ingredientStore: {}
}))


export const useIngredientStore = () => {
    const store = useStore(ingredientStore)
    //TODO: add helper functions here as needed
    return store
}
