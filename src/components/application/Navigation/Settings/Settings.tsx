import { FC, useEffect } from "react";
import {
	Box,
	Group,
	MantineColorScheme,
	SegmentedControl,
	Stack,
	Switch,
	Text,
	Tooltip,
	useMantineColorScheme,
	useMantineTheme,
} from "@mantine/core";
import SettingsPopover from "@/components/SettingsPopover/SettingsPopover";
import { useSettingsStore } from "@/store/useSettingsStore";
import { FiHelpCircle } from "react-icons/fi";
import classes from "./Settings.module.css";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { colorsType } from "@/types";
import { ColorPicker } from "@/components/inputs/ColorPicker";
const { switchStyles } = classes;

const isColorScheme = (value: string) => {
	switch (value) {
		case "auto":
		case "light":
		case "dark":
			return true;
		default:
			return false;
	}
};

const Settings: FC<{ className?: string }> = ({ className }) => {
	const mantineTheme = useMantineColorScheme();
	const {
		settingsStore: { appearance, useDraggable },
		appearanceActions,
		setUseDraggable,
	} = useSettingsStore();

	const { white } = useMantineTheme();

	useEffect(() => {
		if (mantineTheme.colorScheme !== appearance.colorScheme) {
			mantineTheme.setColorScheme(
				appearance.colorScheme as MantineColorScheme,
			);
		}
	}, [appearance.colorScheme, mantineTheme.colorScheme]);
	const { isSmallScreen } = useBreakpoints();
	return (
		<SettingsPopover
			burgerProps={{
				className,
				color: white,
			}}
			title="Application Settings"
		>
			<Stack>
				{!isSmallScreen && (
					<Box className={switchStyles}>
						<Switch
							label={
								<Tooltip
									multiline
									w="211px"
									withArrow
									arrowPosition="side"
									position="bottom-end"
									label="Enabling drag-and-drop allows moving and reordering cards. May not work well on touch-screen devices."
								>
									<Box display="flex">
										Enable drag-and-drop features &nbsp;
										<Box pt="2px">
											<FiHelpCircle />
										</Box>
									</Box>
								</Tooltip>
							}
							className={switchStyles}
							checked={useDraggable}
							labelPosition="left"
							onChange={(event) =>
								setUseDraggable(event.currentTarget.checked)
							}
						/>
					</Box>
				)}
				<Text component="h2" lh="32px" fz="20px" fw="700">
					Appearance
				</Text>
				<Group>
					<Box w="120px">
						<Text component="label" lh="32px" fz="14px" fw="500">
							Color scheme
						</Text>
					</Box>
					<SegmentedControl
						w="250px"
						value={appearance.colorScheme}
						onChange={(value) => {
							if (!isColorScheme(value)) return false;
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
		</SettingsPopover>
	);
};

export default Settings;
