
import { FC } from "react";
import { useDroppable } from "@dnd-kit/core";
import classes from "./BottomSlot.module.css"

interface BottomSlotProps {
    day: string;
    index: number;
}

export const BottomSlot: FC<BottomSlotProps> = ({ day, index }) => {
    const { setNodeRef, isOver } = useDroppable({ id: `${day}:${index}` });
    const { bottomBox, over, inbetween } = classes
    return (
        <>
        {index == 0 && <div className={inbetween} />  }
        <div className={`${bottomBox} ${isOver ? over : ""}`} ref={setNodeRef}/>
        </>
    )
}