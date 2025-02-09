import "@mantine/core/styles.css";
import { CSSVariablesResolver, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Navigation, Footer } from "./components";
import { Meals, Calendar, Pantry, Home } from "./pages";
import classes from "./App.module.css";
import { SaveModalProvider } from "./hooks";

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

export default function App() {
	const resolver: CSSVariablesResolver = () => ({
		dark: {},
		light: {},
		variables: {
			"--popover-shadow": "0px 0px 3px 4px rgb(0 0 0 / 20%)",
			"--primary-color": "var(--mantine-color-green-4)",
			"--secondary-color": "var(--mantine-color-brown-5)",
		},
	});
	return (
		<MantineProvider
			theme={theme}
			cssVariablesResolver={resolver}
			defaultColorScheme="dark"
		>
			<SaveModalProvider>
				<Router />
			</SaveModalProvider>
		</MantineProvider>
	);
}
