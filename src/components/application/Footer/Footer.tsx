import { FC } from "react";
import { Box } from "@mantine/core";
import classes from "./Footer.module.css";

const Footer: FC = () => {
	return (
		<Box className={classes.wrapper}>
			<a href="http://www.trisbc.dev/">trisbc.dev</a>
		</Box>
	);
};

export default Footer;
