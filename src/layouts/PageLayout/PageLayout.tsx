import { FC, ReactNode } from "react";
import { DndContext, DndContextProps, DragEndEvent } from "@dnd-kit/core";
import { Box, Title } from "@mantine/core";

interface PageLayoutProps extends DndContextProps {
	title: string;
	children: ReactNode;
}

export const PageLayout: FC<PageLayoutProps> = ({
	title,
	children,
	...props
}) => {
	return (
		<DndContext {...props}>
			<Title ml="lg">{title}</Title>
			<Box>{children}</Box>
		</DndContext>
	);
};
