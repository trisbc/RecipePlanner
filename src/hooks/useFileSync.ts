import { validationMessages } from "@/constants";
import {
	useCalendarStore,
	useIngredientStore,
	useRecipeStore,
	useSettingsStore,
} from "@/store";
import { useSaveContext } from "./useSaveContext";
import { useState } from "react";
import { RecipeBookFile, SettingsState } from "@/types";

const { uploadDefaultError, corruptFileError, fileFormatError } =
	validationMessages.RecipeBookUpload;

export const useLoadFile = () => {
	const { setCalendarState } = useCalendarStore();
	const { setIngredientState } = useIngredientStore();
	const { setRecipeState } = useRecipeStore();
	const { setSettingsState } = useSettingsStore();
	const { setSaveModalOpen, setLastChangeTimeStamp } = useSaveContext();

	const [fileContent, setFileContent] = useState<
		(RecipeBookFile & { filename: string }) | undefined
	>();
	const [isLoadingFile, setIsLoadingFile] = useState(false);
	const [uploadError, setUploadError] = useState<string | undefined>(
		undefined,
	);

	const resetFile = () => {
		setUploadError(undefined);
	};

	const readFile = (file: File | null) => {
		setUploadError(undefined);
		setIsLoadingFile(true);
		setFileContent(undefined);
		if (!file) return;

		if (file.name.split(".").pop() !== "recipeBook") {
			setUploadError(fileFormatError);
			setIsLoadingFile(false);
			return;
		}

		const fileReader = new FileReader();
		fileReader.onload = (e) => {
			const content = e.target?.result;
			try {
				let parsedFile = undefined;
				if (!content || typeof content !== "string") {
					throw new Error(corruptFileError);
				}
				try {
					parsedFile = JSON.parse(content) as RecipeBookFile;
				} catch (parseError) {
					throw new Error(corruptFileError);
				}
				setFileContent({ ...parsedFile, filename: file.name });
			} catch (error) {
				const errorMessage =
					(error as Error)?.message ?? uploadDefaultError;
				setUploadError(errorMessage);
			} finally {
				setIsLoadingFile(false);
			}
		};

		fileReader.onerror = () => {
			setUploadError(uploadDefaultError);
		};

		fileReader.readAsText(file, "UTF-8");
	};

	const useFile = (file?: RecipeBookFile) => {
		const recipeFile = fileContent ?? file;
		if (!recipeFile) return;

		console.log("recipeFile", recipeFile);

		const {
			calendarState,
			ingredientState,
			recipeState,
			settingsState,
			filename,
			timeStamp,
			recipeBook,
		} = recipeFile;

		setCalendarState(calendarState);
		setIngredientState(ingredientState);
		setRecipeState(recipeState);
		setSettingsState({
			fileInfo: {
				filename,
				timeStamp,
				recipeBook,
			},
			...settingsState,
		} as SettingsState);
		setSaveModalOpen(false);
		setLastChangeTimeStamp(timeStamp);
	};

	return {
		readFile,
		useFile,
		isLoadingFile,
		uploadError,
		fileContent,
		resetFile,
	};
};
