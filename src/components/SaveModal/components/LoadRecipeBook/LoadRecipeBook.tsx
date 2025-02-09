import { validationMessages } from "@/constants";
import { RecipeBookFile } from "@/types";
import { Box, Button, FileButton, Group, TabsPanel, Text } from "@mantine/core";
import { FC, useState } from "react";
import { FiBookOpen, FiUpload } from "react-icons/fi";
import classes from "./LoadRecipeBook.module.css";

const { uploadDefaultError, corruptFileError, fileFormatError } =
	validationMessages.RecipeBookUpload;

const {
	infoList,
	infoListRow,
	uploadButton,
	uploadButtonError,
	uploadButtonChosen,
} = classes;

export const LoadRecipeBook: FC<{ tabName: string }> = ({ tabName }) => {
	const [fileContent, setFileContent] = useState<
		(RecipeBookFile & { filename: string }) | undefined
	>();
	const [isLoadingFile, setIsLoadingFile] = useState(false);
	const [uploadError, setUploadError] = useState<string | undefined>(
		undefined,
	);

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
							>
								Use File
							</Button>
							<Button
								variant="outline"
								onClick={() => setFileContent(undefined)}
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
