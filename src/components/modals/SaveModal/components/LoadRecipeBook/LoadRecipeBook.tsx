import { Box, Button, FileButton, Group, TabsPanel, Text } from "@mantine/core";
import { FC } from "react";
import { FiBookOpen, FiUpload } from "react-icons/fi";
import classes from "./LoadRecipeBook.module.css";
import { useLoadFile } from "@/hooks/useFileSync";

const {
	infoList,
	infoListRow,
	uploadButton,
	uploadButtonError,
	uploadButtonChosen,
} = classes;

export const LoadRecipeBook: FC<{ tabName: string }> = ({ tabName }) => {
	const {
		fileContent,
		readFile,
		useFile,
		uploadError,
		isLoadingFile,
		resetFile,
	} = useLoadFile();

	return (
		<TabsPanel value={tabName}>
			<Group justify="center" px="10%" pb="md">
				<Box display="flex" mt="lg" w="100%">
					{fileContent && (
						<>
							<Box pt="6px" pr="8px">
								<FiBookOpen
									color="var(--primary-color-4)"
									size={20}
								/>
							</Box>
							<Text
								size="lg"
								lh="32px"
								c="var(--primary-color-4)"
								fw="bold"
								span
							>
								{fileContent.filename}
							</Text>
						</>
					)}
					<FileButton onChange={readFile} accept=".recipeBook">
						{(props) => (
							<Button
								className={`${uploadError ? uploadButtonError : uploadButton}${fileContent ? ` ${uploadButtonChosen}` : ""}`}
								loading={isLoadingFile}
								variant="outline"
								leftSection={<FiUpload size={24} />}
								{...props}
							>
								<Box maw="200px">
									<Text
										size="lg"
										span
										maw="100px"
										style={{ textWrap: "wrap" }}
									>
										{uploadError ??
											(fileContent
												? "Change"
												: "Upload RecipeBook")}
									</Text>
								</Box>
							</Button>
						)}
					</FileButton>
				</Box>
				{fileContent && (
					<>
						<dl className={infoList}>
							<div className={infoListRow}>
								<dt>RecipeBook Version</dt>
								<dd>v{fileContent.recipeBook}</dd>
							</div>
							<div className={infoListRow}>
								<dt>Last Edited</dt>
								<dd>
									{fileContent.timeStamp
										? new Date(
												fileContent.timeStamp,
											).toLocaleString()
										: "unknown"}
								</dd>
							</div>
							<div className={infoListRow}>
								<dt>Number of recipes</dt>
								<dd>
									{
										Object.entries(fileContent.recipeState)
											.length
									}
								</dd>
							</div>
							<div className={infoListRow}>
								<dt>Number of ingredients</dt>
								<dd>
									{
										Object.entries(
											fileContent.ingredientState,
										).length
									}
								</dd>
							</div>
						</dl>
						<Group>
							<Button
								variant="filled"
								color="var(--primary-color-4)"
								onClick={() => useFile}
							>
								Use File
							</Button>
							<Button
								variant="outline"
								onClick={resetFile}
								color="var(--primary-color-4)"
							>
								Clear
							</Button>
						</Group>
					</>
				)}
			</Group>
		</TabsPanel>
	);
};
