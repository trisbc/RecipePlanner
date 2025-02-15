import { useTimeStamp } from "@/store";
import { createContext, useState, useContext, FC, ReactNode } from "react";

interface SaveModalContextProps {
	isSaveModalOpen: boolean;
	setSaveModalOpen: (isOpen: boolean) => void;
	hasPendingChanges: boolean;
	lastChangeTimeStamp: number;
	performAction: () => void;
	setLastChangeTimeStamp: (time: number) => void;
	isPendingDownload: boolean;
	setIsPendingDownload: (isPendingDownload: boolean) => void;
}

const SaveModalContext = createContext<SaveModalContextProps | undefined>(
	undefined,
);

export const SaveModalProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isSaveModalOpen, setSaveModalOpen] = useState(false);
	const [lastChangeTimeStamp, setLastChangeTimeStamp] = useState<number>(0);
	const [isPendingDownload, setIsPendingDownload] = useState(false);
	const fileTimeStamp = useTimeStamp();
	const performAction = () => {
		setLastChangeTimeStamp(Date.now());
	};

	return (
		<SaveModalContext.Provider
			value={{
				isSaveModalOpen,
				setSaveModalOpen,
				isPendingDownload,
				setIsPendingDownload,
				hasPendingChanges: lastChangeTimeStamp !== fileTimeStamp,
				lastChangeTimeStamp,
				setLastChangeTimeStamp,
				performAction,
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
