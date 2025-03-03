import Navigation from "./Navigation";
import { useSettingsStore } from "@/store";
import { useEffect } from "react";
import { StorybookProviders } from "@/storybook-utils/StorybookProviders";

export default {
	title: "Nav",
};

const _Nav = () => {
	const {
		setFileInfo,
		settingsStore: { fileInfo },
	} = useSettingsStore();
	useEffect(() => {
		setFileInfo({ ...fileInfo, filename: "storybook" });
	}, []);
	return <Navigation />;
};

export const Nav = () => {
	return (
		<StorybookProviders>
			<_Nav />
		</StorybookProviders>
	);
};
