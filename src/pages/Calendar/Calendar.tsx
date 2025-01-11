import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter,  } from '@dnd-kit/core';
import { Day } from './Day';
import { Box } from '@mantine/core';
import { PageLayout } from '../../layouts/PageLayout';
import { RecipeCard, RecipeCardNoDragging } from '@/components/Recipes/RecipeCard';
import { useState } from 'react';
import { DayState, days, useCalendarStore } from '@/store/useCalendarStore';
import classes from "./Calendar.module.css"

interface IDType {
    locationId: string;
    index: number;
    recipeId: string;
}

const parseID = (id: string) => {
    const parts = id.split(":")
    return { 
        locationId: parts[0], 
        index: parseInt(parts[1]), 
        recipeId: parts[2] 
    }
}

export const Calendar = () => {
    const { spacer } = classes
    const [activeItem, setActiveItem] = useState<IDType | undefined>();

    const {moveRecipe, calendarStore, nullRecipe} = useCalendarStore()
    console.log(calendarStore)
    return (
        <PageLayout title='Calendar' onDragEnd={handleDragEnd} onDragStart={handleDragStart}  /*collisionDetection={closestCenter}*/ >      
            <DragOverlay style={{width: "100vw"}} dropAnimation={null} adjustScale >
                
                    {activeItem && <RecipeCardNoDragging location={activeItem.locationId} index={activeItem.index} id={activeItem.recipeId} widthClass="seven-day" />}
                
            </DragOverlay>  

            <Box className={spacer} >
                <Day day="monday" />
                <Day day="tuesday" />
                <Day day="wednesday" />
                <Day day="thursday" />
                <Day day="friday" />
                <Day day="saturday" />
                <Day day="sunday" />
            </Box>
            <RecipeCard location="drawer" index={0} id="potatoSoup" widthClass="seven-day" />
            <RecipeCard location="drawer" index={0} id="brocSoup" widthClass="seven-day" />
        </PageLayout>
    );
    function handleDragEnd(event: DragEndEvent) {
        setActiveItem(undefined);
        const from = parseID(event.active.id as string);
        const to = event.over ? parseID(event.over.id as string) : undefined;
        const isFromDrawer = from.locationId == "drawer" 
        if (to) {
            const moveFrom = isFromDrawer ? undefined : { day: from.locationId as days, index: from.index }
            moveRecipe(from.recipeId, { day: to.locationId as days, index: to.index}, moveFrom)
        }
    }
    function handleDragStart(event: DragStartEvent) {
        const from = parseID(event.active.id as string);
        const isFromDrawer = from.locationId == "drawer"
        if (!isFromDrawer)  
            nullRecipe(from.locationId, from.index)
        setActiveItem(parseID(event.active.id as string));
      }
}