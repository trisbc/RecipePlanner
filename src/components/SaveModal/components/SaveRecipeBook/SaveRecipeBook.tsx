import { validationMessages } from "@/constants";
import { RecipeBookFile } from "@/types";
import {
	Anchor,
	Box,
	Button,
	FileButton,
	Group,
	TabsPanel,
	Text,
} from "@mantine/core";
import { FC, useState } from "react";
import { FiBookOpen, FiUpload } from "react-icons/fi";
import classes from "./SaveRecipeBook.module.css";
import { useRecipeStore } from "@/store/useRecipeStore";
import { useCalendarStore } from "@/store/useCalendarStore";
import { useIngredientStore } from "@/store/useIngredientStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useSaveContext } from "@/hooks";

const { infoList, infoListRow, saveLink } = classes;

export const SaveRecipeBook: FC<{ tabName: string }> = ({ tabName }) => {
	const { setPendingChanges } = useSaveContext();
	const { calendarStore } = useCalendarStore();
	const { ingredientStore } = useIngredientStore();
	const { recipeStore } = useRecipeStore();
	const {
		settingsStore: { fileInfo, ...settingsStore },
	} = useSettingsStore();

	const currentFile: RecipeBookFile = {
		...fileInfo,
		calendarState: calendarStore,
		ingredientState: ingredientStore,
		recipeState: recipeStore,
		settingsState: settingsStore,
	};

	const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
		JSON.stringify({ ...currentFile, timeStamp: Date.now() }, null, 2),
	)}`;

	const [awaitingSave, setAwaitingSave] = useState(false);

	return (
		<TabsPanel value={tabName}>
			<Group justify="center" px="10%" pb="md" mt="lg">
				<Box pt="6px" pr="8px">
					<FiBookOpen color="var(--primary-color-4)" size={20} />
				</Box>
				<Text
					size="lg"
					lh="32px"
					c="var(--primary-color-4)"
					fw="bold"
					span
				>
					{currentFile.filename}
				</Text>
				<dl className={infoList}>
					<div className={infoListRow}>
						<dt>RecipeBook Version</dt>
						<dd>v{currentFile.recipeBook}</dd>
					</div>
					<div className={infoListRow}>
						<dt>Last Saved</dt>
						<dd>
							{currentFile.timeStamp
								? new Date(
										currentFile.timeStamp,
									).toLocaleString()
								: "unknown"}
						</dd>
					</div>
					<div className={infoListRow}>
						<dt>Number of recipes</dt>
						<dd>
							{Object.entries(currentFile.recipeState).length}
						</dd>
					</div>
					<div className={infoListRow}>
						<dt>Number of ingredients</dt>
						<dd>
							{Object.entries(currentFile.ingredientState).length}
						</dd>
					</div>
				</dl>
				{awaitingSave ? (
					<Button
						variant="outline"
						color="var(--accent-color-4)"
						onClick={() => {
							setPendingChanges(false);
							setAwaitingSave(false);
						}}
					>
						Confirm file downloaded
					</Button>
				) : (
					<Anchor
						href={jsonString}
						download={currentFile.filename}
						className={saveLink}
						onClick={() => setAwaitingSave(true)}
					>
						Save file
					</Anchor>
				)}
			</Group>
		</TabsPanel>
	);
};
