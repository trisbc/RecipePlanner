import { Box, Text } from "@mantine/core";
import { PageLayout } from "../../layouts/PageLayout";

/**
 * The Meals component renders the Meals page layout.
 * This page has not yet been implemented.
 *
 * @returns {JSX.Element} The JSX code for the Meals page layout.
 */
/**
 * The Home component renders the Home page layout.
 * This project is a work in progress, and the only page implemented so far is the Calendar page.
 *
 * @returns {JSX.Element} The JSX code for the Home page layout.
 */
import { Link } from "react-router-dom";

export const Home = () => {
	return (
		<PageLayout title="">
			<Box ml="lg" mt="lg">
				<Text>
					This page has not yet been implemented. This project is a
					work in progress, and the only page implemented so far is
					the Calendar page.
				</Text>
				<Text mt="md">
					<Link to="Calendar">Go to Calendar page</Link>
				</Text>
			</Box>
		</PageLayout>
	);
};
