import { FC, useState } from "react";
import {
	Box,
	Button,
	Group,
	MantineColorScheme,
	SegmentedControl,
	Stack,
	Text,
	useMantineColorScheme,
	useMantineTheme,
} from "@mantine/core";
import SettingsPopover from "@/components/SettingsPopover/SettingsPopover";

const Settings: FC<{ className?: string }> = ({ className }) => {
	const { setColorScheme, colorScheme } = useMantineColorScheme();
	const [anotherSetting, setAnotherSetting] = useState("test1");
	const { white } = useMantineTheme();
	return (
		<SettingsPopover
			burgerProps={{
				className,
				color: white,
			}}
			title="Application Settings"
		>
			<Stack>
				<Group>
					<Box w="120px">
						<Text component="label" lh="32px" fz="14px" fw="500">
							Color Scheme
						</Text>
					</Box>
					<SegmentedControl
						w="250px"
						value={colorScheme}
						onChange={(value) =>
							setColorScheme(value as MantineColorScheme)
						}
						data={[
							{ label: "System theme", value: "auto" },
							{ label: "Light", value: "light" },
							{ label: "Dark", value: "dark" },
						]}
					/>
				</Group>
				<Group>
					<Box w="120px">
						<Text component="label" lh="32px" fz="14px" fw="500">
							Some other setting
						</Text>
					</Box>
					<SegmentedControl
						w="250px"
						value={anotherSetting}
						onChange={setAnotherSetting}
						data={[
							{ label: "Setting 1", value: "test1" },
							{ label: "Setting 2", value: "test2" },
							{ label: "Setting 3", value: "test3" },
						]}
					/>
				</Group>
				<Button
					w="120px"
					color="red"
					onClick={() => setSettingsOpened(false)}
				>
					Close
				</Button>
			</Stack>
		</SettingsPopover>
	);
};

export default Settings;
