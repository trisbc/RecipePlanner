import { FC, useEffect, useRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import classes from "./InbetweenSlot.module.css";

interface InbetweenSlotProps {
	day: string;
	index: number;
}

export const InbetweenSlot: FC<InbetweenSlotProps> = ({ day, index }) => {
	const { setNodeRef, isOver } = useDroppable({ id: `${day}:${index}` });
	const inbetweenRef = useRef<HTMLDivElement>(null);
	const {
		arrow,
		up,
		down,
		"inbetween-line": inbetweenLine,
		inbetween,
		"inbetween-arrow-wrap": inbetweenArrowWrap,
		"inbetween-hover": inbetweenHover,
	} = classes;

	useEffect(() => {
		if (isOver && inbetweenRef.current) {
			inbetweenRef.current.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [isOver]);

	return (
		<div ref={setNodeRef}>
			{isOver ? (
				<div className={inbetweenHover} ref={inbetweenRef}>
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
