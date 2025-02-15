import { FC, ReactNode, useState } from "react";
import { Box, Burger, BurgerProps, Button, Popover, Text } from "@mantine/core";

interface SettingsPopoverProps {
	burgerProps?: BurgerProps;
	title?: string;
	children?: ReactNode;
	hideCloseButton?: boolean;
}

const SettingsPopover: FC<SettingsPopoverProps> = ({
	burgerProps,
	children,
	title,
	hideCloseButton,
}) => {
	const [settingsOpened, setSettingsOpened] = useState(false);
	return (
		<Popover
			opened={settingsOpened}
			onChange={() => setSettingsOpened(!settingsOpened)}
			withArrow
			trapFocus
		>
			<Popover.Target>
				<Burger
					{...burgerProps}
					opened={settingsOpened}
					onClick={() => setSettingsOpened(!settingsOpened)}
				/>
			</Popover.Target>
			<Popover.Dropdown>
				{title && (
					<Text component="h1" lh="32px" fz="20px" fw="700">
						{title}
					</Text>
				)}
				<Box py="lg">{children}</Box>
				{!hideCloseButton && (
					<Button
						mt="16px"
						w="120px"
						color="red"
						onClick={() => setSettingsOpened(false)}
					>
						Close
					</Button>
				)}
			</Popover.Dropdown>
		</Popover>
	);
};

export default SettingsPopover;
