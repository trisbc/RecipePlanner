import { FC, ReactNode,  } from "react"
import { Box } from "@mantine/core"
import classes from "./Navigation.module.css"
import logo from "../../favicon.svg";
import { Link, useLocation } from "react-router-dom";
import { Settings } from "./Settings";

interface NavLinkProps {
    to: string;
    content: ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ to, content: text }) => {

    const { pathname } = useLocation()
    let isSelected = false;
    let navPath = pathname.split("/")[2]
    if (pathname === "/RecipePlanner/") {
        navPath = pathname
    }
    isSelected = navPath === to
    return (
            <Link to={to} className={isSelected ? classes['nav-link-selected'] : classes['nav-link']}>{text}</Link>
    )

    
}

const Navigation: FC = () => {
    return (
            <Box className={classes.wrapper}  >
                {/* <Link className={classes['home-link']} to="/RecipePlanner/">
                    <img src={logo} alt="Your SVG" height="32px" />
                        <Text component="span" className={classes.title}>
                            Recipe Planner
                        </Text>
                </Link>  */}
                <NavLink to="/RecipePlanner/" content={
                    <>
                        <img src={logo} alt="Your SVG" height="32px" />
                        Recipe Planner
                    </>
                } />
                <NavLink to="Meals" content="Meals" />
                <NavLink to="Calendar" content="Calendar" />
                <NavLink to="Pantry" content="Pantry" />
                <Box className={classes.burger}>
                    <Settings/>
                </Box>
            </Box>
    )
}

export default Navigation