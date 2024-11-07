import { FC, useState } from "react"
import { Box, Burger, Button, Group, MantineColorScheme, Popover, SegmentedControl, Stack, Text, useMantineColorScheme } from "@mantine/core"

const Settings: FC<{className?: string}> = ({className}) => {
    const [settingsOpened, setSettingsOpened] = useState(false)
    const { setColorScheme, colorScheme } = useMantineColorScheme();
    const [ anotherSetting, setAnotherSetting ] = useState("test1")
    return (
        <Popover opened={settingsOpened} onChange={() => setSettingsOpened(!settingsOpened)} withArrow trapFocus >
            <Popover.Target>
                <Burger className={className} opened={settingsOpened} onClick={() => setSettingsOpened(!settingsOpened)}  />
            </Popover.Target>
            <Popover.Dropdown>
                <Stack>
                    <Text component="h1" ta="center" lh="32px" fz="20px" fw="700"> Settings </Text>
                    <Group>
                        <Box w="120px">
                            <Text component="label" lh="32px" fz="14px" fw="500">Color Scheme</Text>
                        </Box>
                        <SegmentedControl
                            w="250px"
                            value={colorScheme}
                            onChange={(value) => setColorScheme(value as MantineColorScheme)}
                            data={[
                                { label: 'System theme', value: 'auto' },
                                { label: 'Light', value: 'light' },
                                { label: 'Dark', value: 'dark' }
                            ]}
                        />
                    </Group>
                    <Group>
                        <Box w="120px">
                            <Text component="label" lh="32px" fz="14px" fw="500">Some other setting</Text>
                        </Box>
                        <SegmentedControl
                            w="250px"
                            value={anotherSetting}
                            onChange={setAnotherSetting}
                            data={[
                                { label: 'Setting 1', value: 'test1' },
                                { label: 'Setting 2', value: 'test2' },
                                { label: 'Setting 3', value: 'test3' }
                            ]}
                        />
                    </Group>
                    <Button w="120px" color="red" onClick={() => setSettingsOpened(false)} >
                        Close
                    </Button>
                </Stack>
            </Popover.Dropdown>
        </Popover>
    )
}

export default Settings