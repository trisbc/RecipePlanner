import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Navigation, Footer } from "./components";
import { Meals, Calendar, Pantry, Home } from "./pages";
import classes from "./App.module.css";

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
	return (
		<MantineProvider theme={theme} defaultColorScheme="dark">
			<Router />
		</MantineProvider>
	);
}
