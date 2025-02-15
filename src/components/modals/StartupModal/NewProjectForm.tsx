import { ColorPicker } from "@/components/inputs/ColorPicker";
import {
	blankRecipeBook,
	sampleRecipeBook,
} from "@/constants/sampleRecipeBook";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useLoadFile } from "@/hooks/useFileSync";
import { useSettingsStore } from "@/store";
import {
	Tabs,
	Box,
	TextInput,
	Stack,
	Button,
	Group,
	Text,
	Flex,
	SegmentedControl,
	useMantineColorScheme,
	MantineColorScheme,
	Switch,
} from "@mantine/core";
import { ChangeEventHandler, useEffect, useState } from "react";

export const NewProjectForm = () => {
	const [projectName, setProjectName] = useState("MyRecipes");
	const [checkboxes, setCheckboxes] = useState({
		enableDnd: true,
		includeSamples: false,
	});
	const { useFile } = useLoadFile();

	const handleCheckboxChange: ChangeEventHandler<HTMLInputElement> = (
		event,
	) => {
		const { name, checked } = event.currentTarget;
		setCheckboxes((prev) => ({ ...prev, [name]: checked }));
	};

	const mantineTheme = useMantineColorScheme();
	const {
		settingsStore: { appearance },
		appearanceActions,
	} = useSettingsStore(true);

	useEffect(() => {
		if (mantineTheme.colorScheme !== appearance.colorScheme) {
			mantineTheme.setColorScheme(
				appearance.colorScheme as MantineColorScheme,
			);
		}
	}, [appearance.colorScheme, mantineTheme.colorScheme]);

	const { isLargeScreen, isSmallScreen } = useBreakpoints();

	const createButton = (
		<Button
			w="200px"
			bg="var(--primary-color-4)"
			mt={isLargeScreen ? "200px" : "72px"}
			onClick={() =>
				useFile({
					...(checkboxes.includeSamples
						? sampleRecipeBook
						: blankRecipeBook),
					filename: `${projectName}.recipeBook`,
					recipeBook: 1,
					timeStamp: Date.now(),
					settingsState: {
						useDraggable: !isSmallScreen && checkboxes.enableDnd,
						appearance,
						calendar: {
							numDays: "seven-day",
							startDay: "monday",
						},
					},
				})
			}
		>
			Create project
		</Button>
	);

	return (
		<Tabs.Panel value="new">
			<Flex
				justify="space-between"
				px="10%"
				wrap="wrap"
				direction={isLargeScreen ? "row" : "column"}
			>
				<Box w={isLargeScreen ? "40%" : "100%"} my="lg">
					<Text component="h2" lh="32px" fz="20px" fw="700">
						Settings
					</Text>

					<Stack gap="48px">
						<Box maw="436px">
							<TextInput
								label="Project Name"
								placeholder="Enter project name"
								rightSection=".recipebook"
								rightSectionWidth="100px"
								width="fit-content"
								maxLength={30}
								value={projectName}
								onChange={(event) =>
									setProjectName(event.currentTarget.value)
								}
								error={
									!/^[a-zA-Z0-9-_ ]+$/.test(projectName) &&
									"Project name can only contain letters, numbers, hyphens, underscores and spaces"
								}
							/>
						</Box>
						{!isSmallScreen && (
							<Switch
								label="Enable Drag-and-Drop features"
								checked={checkboxes.enableDnd}
								name="enableDnd"
								onChange={handleCheckboxChange}
							/>
						)}
						<Switch
							label="Include sample recipes"
							name="includeSamples"
							checked={checkboxes.includeSamples}
							onChange={handleCheckboxChange}
						/>
					</Stack>
					{isLargeScreen && createButton}
				</Box>
				{isLargeScreen && (
					<Box
						w="0px"
						h="400px"
						my="lg"
						bd="solid 1px var(--primary-color-4);"
					/>
				)}
				<Box w={isLargeScreen ? "40%" : "100%"} my="lg">
					<Text component="h2" lh="32px" fz="20px" fw="700">
						Appearance
					</Text>
					<Stack>
						<Group>
							<Box w="120px">
								<Text
									component="label"
									lh="32px"
									fz="14px"
									fw="500"
								>
									Color scheme
								</Text>
							</Box>
							<SegmentedControl
								w="250px"
								value={appearance.colorScheme}
								onChange={(value) => {
									mantineTheme.setColorScheme(
										value as MantineColorScheme,
									);
									appearanceActions.setColorScheme(
										value as MantineColorScheme,
									);
								}}
								data={[
									{ label: "System theme", value: "auto" },
									{ label: "Light", value: "light" },
									{ label: "Dark", value: "dark" },
								]}
							/>
						</Group>
						<Text component="h3" lh="24px" fz="16px" fw="700">
							Colors
						</Text>
						<Group grow>
							<ColorPicker
								title="Primary"
								selectedColor={appearance.primaryColor}
								onSelectColor={(color) =>
									appearanceActions.setPrimaryColor(color)
								}
							/>
							<ColorPicker
								title="Secondary"
								selectedColor={appearance.secondaryColor}
								onSelectColor={(color) =>
									appearanceActions.setSecondaryColor(color)
								}
							/>
							<ColorPicker
								title="Accent"
								selectedColor={appearance.accentColor}
								onSelectColor={(color) =>
									appearanceActions.setAccentColor(color)
								}
							/>
						</Group>
					</Stack>
					{!isLargeScreen && createButton}
				</Box>
			</Flex>
		</Tabs.Panel>
	);
};
