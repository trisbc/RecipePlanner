import { BrowserRouter } from "react-router-dom";
import Componenet from "./Settings";
import { SaveModalProvider } from "@/hooks";

export default {
	title: "Nav/Settings",
};

export const Settings = () => (
	<BrowserRouter>
		<SaveModalProvider>
			<Componenet />
		</SaveModalProvider>
	</BrowserRouter>
);
