import { colorsType, SettingsState } from "@/types";
import { createStore, useStore } from "zustand";


type SettingsStoreActions = {
    setSettingsState: (nextState: SettingsState) => void;
    setUseDraggable: (useDraggable: boolean) => void;
    appearanceActions: {
        setColorScheme: (colorScheme: SettingsState["appearance"]["colorScheme"]) => void;
        setPrimaryColor: (color: colorsType) => void; 
        setSecondaryColor: (color: colorsType) => void;
        setAccentColor: (color: colorsType) => void;
    }
    calendarActions: {
        setNumDays: (numDays: SettingsState["calendar"]["numDays"]) => void;
        setStartDay: (startDay: SettingsState["calendar"]["startDay"]) => void;
    }
    setFileInfo: (fileInfo: SettingsState["fileInfo"]) => void;
  }

type SettingsStore =  SettingsState & SettingsStoreActions

export const settingsStore = createStore<SettingsStore>()((set) => ({
    useDraggable: true,
    appearance: {
        colorScheme: "auto",
        primaryColor: "green",
        secondaryColor: "brown",
        accentColor: "cornflower"
    },
    calendar: {
        numDays: "seven-day",
        startDay: "monday"
    },
    fileInfo: {
        filename: "myRecipes.recipeBook",
        timeStamp: 0,
        recipeBook: 1
    },
    // setters 
    setSettingsState: (nextState) => set((prevState) => ({...prevState, ...nextState})),
    setUseDraggable: (useDraggable) => set((prevState) => ({...prevState, useDraggable})),
    appearanceActions: {
        setColorScheme: (colorScheme) => set((prevState) => ({...prevState, appearance: {...prevState.appearance, colorScheme}})),
        setPrimaryColor: (primaryColor: colorsType) => set((prevState) => ({...prevState, appearance: {...prevState.appearance, primaryColor}})),
        setSecondaryColor: (secondaryColor: colorsType) => set((prevState) => ({...prevState, appearance: {...prevState.appearance, secondaryColor}})),
        setAccentColor: (accentColor: colorsType) => set((prevState) => ({...prevState, appearance: {...prevState.appearance, accentColor}}))
    },
    calendarActions: {
        setNumDays:  (numDays) => set((prevState) => ({...prevState, calendar: {...prevState.calendar, numDays}})),
        setStartDay: (startDay) => set((prevState) => ({...prevState, calendar: {...prevState.calendar, startDay}}))
    },
    setFileInfo: (fileInfo) => set((prevState) => ({...prevState, fileInfo}))
}))


export const useSettingsStore = () => {
    const { setSettingsState, setColorScheme, setUseDraggable, calendarActions, appearanceActions, ...store } = useStore(settingsStore)

    return { settingsStore: store, setSettingsState, setColorScheme, setUseDraggable, calendarActions, appearanceActions}
}
