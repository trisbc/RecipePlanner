import { useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const useBreakpoints = () => {
	const theme = useMantineTheme();
	const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
	const isMediumScreen =
		useMediaQuery(`(max-width: ${theme.breakpoints.md})`) && !isSmallScreen;
	const isLargeScreen = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
	const isExtraLargeScreen = useMediaQuery(
		`(min-width: ${theme.breakpoints.lg})`,
	);

	return { isSmallScreen, isMediumScreen, isLargeScreen, isExtraLargeScreen };
};
