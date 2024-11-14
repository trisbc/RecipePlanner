import { FC } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Text, Title } from '@mantine/core';
import { FiMove, FiEdit, FiTrash } from "react-icons/fi";
import classes from "./RecipeCard.module.css"

interface RecipeCardProps {
    id: string;
}


export const RecipeCard: FC<RecipeCardProps> = ({ id }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} className={classes["card-wrapper"]} >
            <div className={classes["button-stack"]} >
                <button {...listeners} {...attributes} className={`${classes["icon-button"]} ${classes["drag-handle"]}`} ><FiMove color="black" /></button>
                <button className={classes["icon-button"]} ><FiEdit color="black" /></button>
                <button className={classes["icon-button"]} ><FiTrash color="black" /></button>
            </div>
            <div className={classes["content"]}>
                <Title order={3} fz="lg" lh="md" fw="normal">
                    Title Here
                </Title>
                40 minutes
            </div>
        </div>
    );
}