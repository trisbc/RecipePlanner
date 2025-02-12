import "@mantine/core/styles.css";
import { CSSVariablesResolver, MantineProvider } from "@mantine/core";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import classes from "./App.module.css";
import { Meals, Calendar, Pantry, Home } from "./pages";
import { Footer, Navigation } from "./components/application";
import { SaveModalProvider } from "./hooks";
import { colorsType } from "./types";
import { theme } from "./theme";
import { useSettingsStore } from "./store/useSettingsStore";

const ApplicationLayout = () => {
	return (
		<div className={classes["page-container"]}>
			<Navigation />
			<div className={classes["content-wrap"]}>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

const routes = createBrowserRouter([
	{
		path: "/RecipePlanner/",
		element: <ApplicationLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "Meals/",
				element: <Meals />,
			},
			{
				path: "Calendar/",
				element: <Calendar />,
			},
			{
				path: "Pantry/",
				element: <Pantry />,
			},
		],
	},
]);

const Router = () => {
	return <RouterProvider router={routes} />;
};

const createColorSet = (
	level: "primary" | "secondary" | "accent",
	color: colorsType,
	mantineColors: Record<string, string[]>,
) => {
	const selectedColorArray = mantineColors[color];
	const colorSet: Record<string, string> = {};
	selectedColorArray.forEach(
		(color, index) => (colorSet[`--${level}-color-${index}`] = color),
	);
	return colorSet;
};

export default function App() {
	return (
		<SaveModalProvider>
			<MantineLayer />
		</SaveModalProvider>
	);
}

const MantineLayer = () => {
	const {
		settingsStore: { appearance },
	} = useSettingsStore();
	const resolver: CSSVariablesResolver = () => ({
		dark: {},
		light: {},
		variables: {
			"--popover-shadow": "0px 0px 3px 4px rgb(0 0 0 / 20%)",
			...createColorSet(
				"primary",
				appearance.primaryColor,
				theme.colors as unknown as Record<string, string[]>,
			),
			...createColorSet(
				"secondary",
				appearance.secondaryColor,
				theme.colors as unknown as Record<string, string[]>,
			),
			...createColorSet(
				"accent",
				appearance.accentColor,
				theme.colors as unknown as Record<string, string[]>,
			),
		},
	});
	return (
		<MantineProvider
			theme={theme}
			cssVariablesResolver={resolver}
			defaultColorScheme="dark"
		>
			<Router />
		</MantineProvider>
	);
};
