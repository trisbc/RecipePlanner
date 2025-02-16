import { RecipeBookFile } from "@/types";
import { Anchor, Box, Button, Group, TabsPanel, Text } from "@mantine/core";
import { FC, useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import classes from "./SaveRecipeBook.module.css";
import {
	useRecipeStore,
	useCalendarStore,
	useIngredientStore,
	useSettingsStore,
} from "@/store";
import { useSaveContext } from "@/hooks";
import { ThemeButton } from "@/components/buttons/ThemeButton";

const { infoList, infoListRow, saveLink } = classes;

export const SaveRecipeBook: FC<{ tabName: string }> = ({ tabName }) => {
	const {
		lastChangeTimeStamp,
		setIsPendingDownload,
		isPendingDownload,
		setSaveModalOpen,
	} = useSaveContext();
	const { calendarStore } = useCalendarStore();
	const { ingredientStore } = useIngredientStore();
	const { recipeStore } = useRecipeStore();
	const {
		settingsStore: { fileInfo, ...settingsStore },
		setFileInfo,
	} = useSettingsStore();

	const currentFile: RecipeBookFile = {
		...fileInfo,
		calendarState: calendarStore,
		ingredientState: ingredientStore,
		recipeState: recipeStore,
		settingsState: settingsStore,
	};
	const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
		JSON.stringify({ ...currentFile, timeStamp: lastChangeTimeStamp }),
	)}`;
	const fileTimeStamp = fileInfo.timeStamp;

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
							{fileTimeStamp
								? new Date(fileTimeStamp).toLocaleString()
								: "unknown"}
						</dd>
					</div>
					<div className={infoListRow}>
						<dt>Most recent change</dt>
						<dd>
							{lastChangeTimeStamp
								? new Date(lastChangeTimeStamp).toLocaleString()
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
				{/* TODO: replace this with its own modal */}
				{isPendingDownload && (
					<ThemeButton
						text="Confirm file downloaded"
						variant="primary-outline"
						onClick={() => {
							setFileInfo({
								...fileInfo,
								timeStamp: lastChangeTimeStamp,
							});
							setIsPendingDownload(false);
							setSaveModalOpen(false);
						}}
					/>
				)}
				<Anchor
					href={jsonString}
					download={currentFile.filename}
					className={saveLink}
					onClick={() => setIsPendingDownload(true)}
				>
					{isPendingDownload ? "Download again" : "Save file"}
				</Anchor>
			</Group>
		</TabsPanel>
	);
};
