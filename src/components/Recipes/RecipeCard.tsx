import { FC } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Text, Title } from '@mantine/core';
import { FiMove, FiEdit, FiTrash } from "react-icons/fi";
import { RecipeType } from '@/types/recipeType';
import classes from "./RecipeCard.module.css"
import { days, recipeStore, useCalendarStore } from '@/store/useCalendarStore';

interface RecipeCardProps {
    id: string;
    location: "drawer" | days
    index: number;
    widthClass?: "seven-day" | "three-day" | "full-width";
}

export const RecipeCardNoDragging : FC<RecipeCardProps> = ({ id, location, index, widthClass }) => {
    let className = classes["card-wrapper"]
    const { title, description, prepTime, cookTime } = recipeStore[id]
    if (widthClass) className += ` ${classes[widthClass]}`

    return (
        <div className={className} >
            <div className={classes["button-stack"]} >
                <button className={`${classes["icon-button"]} ${classes["drag-handle"]}`} ><FiMove color="black" /></button>
                <button className={classes["icon-button"]} ><FiEdit color="black" /></button>
                <button className={classes["icon-button"]} ><FiTrash color="black" /></button>
            </div>
            <div className={classes["content"]}>
                <Title order={3} fz="lg" lh="md" fw="normal">
                    {title}
                </Title>
                
                {description && <Text>{description}</Text>}
                {(cookTime || prepTime) && <Text>{(cookTime ?? 0) + (prepTime ?? 0)} minutes</Text>}

            </div>
        </div>
    );
} 

export const RecipeCard: FC<RecipeCardProps> = ({ id, location, index, widthClass }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: `${location}:${index}:${id}` });
    const style = {
        transform: CSS.Translate.toString(transform),
    };
    let className = classes["card-wrapper"]
    const { title, description, prepTime, cookTime } = recipeStore[id]
    if (widthClass) className += ` ${classes[widthClass]}`

    const { deleteRecipe } = useCalendarStore()
    const handleDelete = () => {
        deleteRecipe(location, index);
    }

    return (
        <div ref={setNodeRef} style={style} className={className} >
            <div className={classes["button-stack"]} >
                <button {...listeners} {...attributes} className={`${classes["icon-button"]} ${classes["drag-handle"]}`} ><FiMove color="black" /></button>
                <button className={classes["icon-button"]} ><FiEdit color="black" /></button>
                <button className={classes["icon-button"]} onClick={handleDelete} ><FiTrash color="black" /></button>
            </div>
            <div className={classes["content"]}>
                <Title order={3} fz="lg" lh="md" fw="normal">
                    {title}
                </Title>
                
                {description && <Text>{description}</Text>}
                {(cookTime || prepTime) && <Text>{(cookTime ?? 0) + (prepTime ?? 0)} minutes</Text>}

            </div>
        </div>
    );
}