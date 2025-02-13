import { Modal, Tabs, Group, Text, Box, Title } from "@mantine/core";
import { useSaveContext } from "@/hooks";
import { FiBookOpen, FiUpload } from "react-icons/fi";
import { NewProjectForm } from "./NewProjectForm";
import { LoadRecipeBook } from "../SaveModal/components";

export const StartupModal = () => {
	const { lastChangeTimeStamp } = useSaveContext();
	return (
		<Modal
			opened={!lastChangeTimeStamp}
			onClose={() => {}}
			withCloseButton={false}
			size="80%"
			fullScreen={false}
			closeOnClickOutside={false}
			closeOnEscape={false}
		>
			<Group>
				<Title mb="lg" size="h1" order={1} tabIndex={-1}>
					Recipe Planner
				</Title>
			</Group>

			<Tabs
				defaultValue="new"
				color="var(--primary-color-4)"
				keepMounted={false}
			>
				<Tabs.List grow>
					<Tabs.Tab
						value="new"
						leftSection={<FiBookOpen size={24} />}
					>
						<Text size="24px" component="span" mx="auto">
							New RecipeBook
						</Text>
					</Tabs.Tab>
					<Tabs.Tab value="load" leftSection={<FiUpload size={24} />}>
						<Text size="24px" component="span" mx="auto">
							Load RecipeBook
						</Text>
					</Tabs.Tab>
				</Tabs.List>
				<NewProjectForm />
				<LoadRecipeBook tabName="load" />
			</Tabs>
		</Modal>
	);
};
