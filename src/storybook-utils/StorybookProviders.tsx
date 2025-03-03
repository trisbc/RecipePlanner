import { MantineLayer } from "@/App";
import { SaveModalProvider } from "@/hooks";
import { FC, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

export const StorybookProviders: FC<{ children: ReactNode }> = ({
	children,
}) => (
	<BrowserRouter>
		<SaveModalProvider>
			<MantineLayer>{children}</MantineLayer>
		</SaveModalProvider>
	</BrowserRouter>
);
