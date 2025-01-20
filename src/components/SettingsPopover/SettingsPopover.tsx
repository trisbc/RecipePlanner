import { FC, ReactNode, useState } from "react";
import { Burger, BurgerProps, Popover, Text } from "@mantine/core";

interface SettingsPopoverProps {
	burgerProps?: BurgerProps;
	title?: string;
	children?: ReactNode;
}

const SettingsPopover: FC<SettingsPopoverProps> = ({
	burgerProps,
	children,
	title,
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
				{children}
			</Popover.Dropdown>
		</Popover>
	);
};

export default SettingsPopover;
