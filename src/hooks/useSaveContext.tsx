import { createContext, useState, useContext, FC, ReactNode } from "react";

interface SaveModalContextProps {
	isSaveModalOpen: boolean;
	setSaveModalOpen: (isOpen: boolean) => void;
	hasPendingChanges: boolean;
	setPendingChanges: (hasChanges: boolean) => void;
}

const SaveModalContext = createContext<SaveModalContextProps | undefined>(
	undefined,
);

export const SaveModalProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isSaveModalOpen, setSaveModalOpen] = useState(false);
	const [hasPendingChanges, setPendingChanges] = useState(false);

	return (
		<SaveModalContext.Provider
			value={{
				isSaveModalOpen,
				setSaveModalOpen,
				hasPendingChanges,
				setPendingChanges,
			}}
		>
			{children}
		</SaveModalContext.Provider>
	);
};

export const useSaveContext = () => {
	const context = useContext(SaveModalContext);
	if (!context) {
		throw new Error("useSaveModal must be used within a SaveModalProvider");
	}
	return context;
};
