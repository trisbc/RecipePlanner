import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval"; // can use anything: IndexedDB, Ionic Storage, etc.
import { RecipeBookFile } from "@/types";
import { timeStamp } from "console";

interface fileStubType {
	key: string;
	filename: string;
	timeStamp: number;
	numRecipes: number;
}

export type FileStore = {
	files: Record<string, RecipeBookFile>;
	saveFile: (file: RecipeBookFile) => void;
	getFile: (key: string) => RecipeBookFile | undefined;
	deleteFile: (key: string) => Boolean;
	getFileStubs: () => fileStubType[];
};

// Custom storage object
const storage: StateStorage = {
	getItem: async (name: string): Promise<string | null> => {
		console.log(name, "has been retrieved");
		return (await get(name)) || null;
	},
	setItem: async (name: string, value: string): Promise<void> => {
		await set(name, value);
		console.log(name, "with value", value, "has been saved");
	},
	removeItem: async (name: string): Promise<void> => {
		console.log(name, "has been deleted");
		await del(name);
	},
};

export const fileStore = create<FileStore>()(
	persist(
		(set, get) => ({
			saveFile: (file: RecipeBookFile) => {
				const { files } = (get() as FileStore | undefined) ?? {};
				return set({
					files: {
						...files,
						[file.filename]: file,
					},
				});
			},
			getFile: (key: string) => {
				const { files } = (get() as FileStore | undefined) ?? {};
				if (!files) throw new Error("No files found in IndexedDB");
				return files ? files[key] : undefined;
			},
			deleteFile: (key: string) => {
				const { files } = (get() as FileStore | undefined) ?? {};
				if (!files) throw new Error("No files found in IndexedDB");
				if (files[key]) {
					const { [key]: _, ...newFiles } = files;
					set({ files: newFiles });
					return true;
				}
				return false;
			},
			getFileStubs: () => {
				const { files } = (get() as FileStore | undefined) ?? {};
				if (!files) return [];
				return Object.entries(files).map(([key, file]) => ({
					key,
					filename: file.filename,
					timeStamp: file.timeStamp,
					numRecipes: Object.values(file.recipeState).length,
				}));
			},
			files: {},
		}),
		{
			name: "RP-book-storage", // unique name
			storage: createJSONStorage(() => storage),
		},
	),
);
