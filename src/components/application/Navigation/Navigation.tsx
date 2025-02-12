import { FC, ReactNode } from "react";
import { Box } from "@mantine/core";
import classes from "./Navigation.module.css";
import logo from "../../../favicon.svg";
import { Link, useLocation } from "react-router-dom";
import { Settings } from "./Settings";
import { SaveModal } from "@/components";

interface NavLinkProps {
	to: string;
	content: ReactNode;
}

const { navLinkSelected, navLink, buttonsWrapper } = classes;

const NavLink: FC<NavLinkProps> = ({ to, content: text }) => {
	const { pathname } = useLocation();
	let isSelected = false;
	let navPath = pathname.split("/")[2];
	if (pathname === "/RecipePlanner/") {
		navPath = pathname;
	}
	isSelected = navPath === to;
	return (
		<Link to={to} className={isSelected ? navLinkSelected : navLink}>
			{text}
		</Link>
	);
};

const Navigation: FC = () => {
	const { wrapper, burger } = classes;
	return (
		<Box className={wrapper}>
			<NavLink
				to="/RecipePlanner/"
				content={
					<>
						<img src={logo} alt="Your SVG" height="32px" />
						Recipe Planner
					</>
				}
			/>
			<NavLink to="Meals" content="Meals" />
			<NavLink to="Calendar" content="Calendar" />
			<NavLink to="Pantry" content="Pantry" />
			<Box className={buttonsWrapper}>
				<SaveModal />
				<Box className={burger}>
					<Settings />
				</Box>
			</Box>
		</Box>
	);
};

export default Navigation;
