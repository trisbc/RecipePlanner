import { useSaveContext } from "@/hooks";
import { colorsType, SettingsState } from "@/types";
import { create, createStore, useStore } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { fileStore, useFileStore } from "./useFileStore";
import { useEffect } from "react";
import { del, get, set } from "idb-keyval";

type SettingsStoreActions = {
	setSettingsState: (nextState: SettingsState) => void;
	setUseDraggable: (useDraggable: boolean) => void;
	setColorScheme: (
		colorScheme: SettingsState["appearance"]["colorScheme"],
	) => void;
	setPrimaryColor: (color: colorsType) => void;
	setSecondaryColor: (color: colorsType) => void;
	setAccentColor: (color: colorsType) => void;
	setNumDays: (numDays: SettingsState["calendar"]["numDays"]) => void;
	setStartDay: (startDay: SettingsState["calendar"]["startDay"]) => void;
	setFileInfo: (fileInfo: SettingsState["fileInfo"]) => void;
};

type SettingsStore = SettingsState & SettingsStoreActions;
const onPromiseDone = (start: DOMHighResTimeStamp) => performance.now() - start;
// Custom storage object
const storage: StateStorage = {
	getItem: async (name: string): Promise<string | null> => {
		console.log(name, "starting get");
		let start = performance.now();
		return get(name).then((value) => {
			console.log(
				name,
				"has been retrieved in",
				onPromiseDone(start) * 0.001,
			);
			return value || null;
		});
	},
	setItem: async (name: string, value: string): Promise<void> => {
		console.log(name, "starting set");
		let start = performance.now();
		return set(name, value).then(() => {
			console.log(
				name,
				"has been saved in",
				onPromiseDone(start) * 0.001,
			);
			return;
		});
	},
	removeItem: async (name: string): Promise<void> => {
		console.log(name, "starting set");
		let start = performance.now();
		return del(name).then(() => {
			console.log(
				name,
				"has been deleted in",
				onPromiseDone(start) * 0.001,
			);
			return;
		});
	},
};

export const settingsStore = create<SettingsStore>()(
	persist(
		(set) => ({
			useDraggable: true,
			appearance: {
				colorScheme: "auto",
				primaryColor: "green",
				secondaryColor: "brown",
				accentColor: "cornflower",
			},
			calendar: {
				numDays: "seven-day",
				startDay: "monday",
			},
			fileInfo: {
				filename: "",
				timeStamp: 0,
				recipeBook: 1,
			},
			// setters
			setSettingsState: (nextState) =>
				set((prevState) => ({ ...prevState, ...nextState })),
			setUseDraggable: (useDraggable) =>
				set((prevState) => ({ ...prevState, useDraggable })),
			setColorScheme: (colorScheme) =>
				set((prevState) => ({
					...prevState,
					appearance: { ...prevState.appearance, colorScheme },
				})),
			setPrimaryColor: (primaryColor: colorsType) =>
				set((prevState) => ({
					...prevState,
					appearance: { ...prevState.appearance, primaryColor },
				})),
			setSecondaryColor: (secondaryColor: colorsType) =>
				set((prevState) => ({
					...prevState,
					appearance: { ...prevState.appearance, secondaryColor },
				})),
			setAccentColor: (accentColor: colorsType) =>
				set((prevState) => ({
					...prevState,
					appearance: { ...prevState.appearance, accentColor },
				})),
			setNumDays: (numDays) =>
				set((prevState) => ({
					...prevState,
					calendar: { ...prevState.calendar, numDays },
				})),
			setStartDay: (startDay) =>
				set((prevState) => ({
					...prevState,
					calendar: { ...prevState.calendar, startDay },
				})),

			setFileInfo: (fileInfo) =>
				set((prevState) => ({ ...prevState, fileInfo })),
		}),
		{
			name: "RP-settings", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => storage),
		},
	),
);

export const useSettingsStore = (suppressChangeTracking?: boolean) => {
	const trackChange = () => {
		if (!suppressChangeTracking) performAction();
	};

	const {
		setSettingsState,
		setUseDraggable,
		setNumDays,
		setStartDay,
		setColorScheme,
		setPrimaryColor,
		setSecondaryColor,
		setAccentColor,
		setFileInfo,
		...store
	} = useStore(settingsStore);
	const { performAction } = useSaveContext();
	const { getFileStubs, saveFile } = useStore(fileStore);

	// useEffect(() => {
	// 	const interval = setInterval(() => {

	// 		saveFile({...store.fileInfo});
	// 	}, 5000);

	// 	return () => clearInterval(interval);
	// }, [saveFile]);

	return {
		settingsStore: store,
		setSettingsState,
		setUseDraggable: (useDraggable: boolean) => {
			trackChange();
			setUseDraggable(useDraggable);
		},
		calendarActions: {
			setNumDays: (numDays: SettingsState["calendar"]["numDays"]) => {
				trackChange();
				setNumDays(numDays);
			},
			setStartDay: (startDay: SettingsState["calendar"]["startDay"]) => {
				trackChange();
				setStartDay(startDay);
			},
		},
		appearanceActions: {
			setColorScheme: (
				colorScheme: SettingsState["appearance"]["colorScheme"],
			) => {
				trackChange();
				setColorScheme(colorScheme);
			},
			setPrimaryColor: (color: colorsType) => {
				trackChange();
				setPrimaryColor(color);
			},
			setSecondaryColor: (color: colorsType) => {
				trackChange();
				setSecondaryColor(color);
			},
			setAccentColor: (color: colorsType) => {
				trackChange();
				setAccentColor(color);
			},
		},
		setFileInfo,
	};
};

export const useTimeStamp = () => {
	const {
		fileInfo: { timeStamp },
	} = useStore(settingsStore);
	return timeStamp;
};
