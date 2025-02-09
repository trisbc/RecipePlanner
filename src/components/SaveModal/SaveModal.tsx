import { Modal, Button, Tabs, Group, Text, Box, Title } from "@mantine/core";
import { SaveButton } from "../SaveButton.tsx";
import { useSaveContext } from "@/hooks";
import { FiBookOpen, FiSave, FiSettings, FiXCircle } from "react-icons/fi";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { LoadRecipeBook } from "./components/LoadRecipeBook";

export const SaveModal = () => {
	const {
		isSaveModalOpen,
		setSaveModalOpen,
		hasPendingChanges,
		setPendingChanges,
	} = useSaveContext();

	const { isSmallScreen } = useBreakpoints();

	return (
		<>
			<Modal
				opened={isSaveModalOpen}
				onClose={() => setSaveModalOpen(false)}
				withCloseButton={false}
				size="xl"
				fullScreen={isSmallScreen}
			>
				<Group>
					<Title size="h1" order={1} tabIndex={-1}>
						Manage your RecipeBook
					</Title>
					<Button
						variant="transparent"
						ml="auto"
						c="black"
						onClick={() => setSaveModalOpen(false)}
					>
						<FiXCircle size="24" />
					</Button>
				</Group>
				<Box mb="12px">
					<Text
						size="sm"
						c={hasPendingChanges ? "red" : "green"}
						fw="bold"
					>
						{hasPendingChanges
							? "You have unsaved changes"
							: "All changes saved"}
					</Text>
				</Box>

				<Tabs defaultValue="save">
					<Tabs.List grow>
						<Tabs.Tab
							value="save"
							leftSection={<FiSave size={24} />}
						>
							<Text size="24px" component="span" mx="auto">
								Save changes
							</Text>
						</Tabs.Tab>
						<Tabs.Tab
							value="load"
							leftSection={<FiBookOpen size={24} />}
						>
							<Text size="24px" component="span" mx="auto">
								Load RecipeBook
							</Text>
						</Tabs.Tab>
						<Tabs.Tab
							value="info"
							leftSection={<FiSettings size={24} />}
						>
							<Text size="24px" component="span" mx="auto">
								Settings
							</Text>
						</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="save">Gallery tab content</Tabs.Panel>
					<LoadRecipeBook tabName="load" />
				</Tabs>
			</Modal>

			<SaveButton
				unsavedChanges={hasPendingChanges}
				onClick={() => setSaveModalOpen(true)}
			/>
		</>
	);
};
