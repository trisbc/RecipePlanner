import { FC } from "react";
import { useDroppable } from "@dnd-kit/core";
import classes from "./InbetweenSlot.module.css";

interface InbetweenSlotProps {
	day: string;
	index: number;
}

export const InbetweenSlot: FC<InbetweenSlotProps> = ({ day, index }) => {
	const { setNodeRef, isOver } = useDroppable({ id: `${day}:${index}` });
	const {
		arrow,
		up,
		down,
		"inbetween-line": inbetweenLine,
		inbetween,
		"inbetween-arrow-wrap": inbetweenArrowWrap,
		"inbetween-hover": inbetweenHover,
	} = classes;
	return (
		<div ref={setNodeRef}>
			{isOver ? (
				<div className={inbetweenHover}>
					<div className={inbetweenArrowWrap}>
						<i className={`${arrow} ${down}`} />
					</div>
					<div className={inbetweenLine} />
					<div className={inbetweenArrowWrap}>
						<i className={`${arrow} ${up}`} />
					</div>
				</div>
			) : (
				<div className={inbetween} />
			)}
		</div>
	);
};
