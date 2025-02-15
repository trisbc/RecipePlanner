import { FC, useEffect, useRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import classes from "./BottomSlot.module.css";

interface BottomSlotProps {
	day: string;
	index: number;
}

export const BottomSlot: FC<BottomSlotProps> = ({ day, index }) => {
	const { setNodeRef, isOver } = useDroppable({ id: `${day}:${index}` });
	const { bottomBox, over, inbetween } = classes;
	const divRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (isOver && divRef.current) {
			divRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [isOver]);

	return (
		<>
			{index === 0 && <div className={inbetween} />}
			<div
				className={`${bottomBox} ${isOver ? over : ""}`}
				ref={(node) => {
					setNodeRef(node);
					divRef.current = node;
				}}
			/>
		</>
	);
};
