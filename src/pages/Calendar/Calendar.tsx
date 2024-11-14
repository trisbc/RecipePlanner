import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Day } from './Day';
import { Box } from '@mantine/core';
import classes from "./Calendar.module.css"
import { PageLayout } from '../PageLayout';
import { RecipeCard } from '@/components/Recipes/RecipeCard';
import { useState } from 'react';

export const Calendar = () => {
    const { spacer } = classes
    const [isDropped, setIsDropped] = useState<boolean | string>(false);

    return (
        <PageLayout title='Calendar' onDragEnd={handleDragEnd}>
            <Box className={spacer} >
                <Day id="sunday">
                    {isDropped === "sunday" &&
                        <RecipeCard id={'test-card'} />
                    }
                </Day>
                <Day id="monday">
                    {isDropped === "monday" &&
                        <RecipeCard id={'test-card'} />
                    }
                </Day>
                <Day id="tuesday">
                    {isDropped === "tuesday" &&
                        <RecipeCard id={'test-card'} />
                    }
                </Day>
                <Day id="wednesday">
                    {isDropped === "wednesday" &&
                        <RecipeCard id={'test-card'} />
                    }
                </Day>
                <Day id="thursday">
                    {isDropped === "thursday" &&
                        <RecipeCard id={'test-card'} />
                    }
                </Day>
                <Day id="friday">
                    {isDropped === "friday" &&
                        <RecipeCard id={'test-card'} />
                    }
                </Day>
                <Day id="saturday">
                    {isDropped === "saturday" &&
                        <RecipeCard id={'test-card'} />
                    }
                </Day>
            </Box>
            {isDropped === false && <RecipeCard id={'test-card'} />}
        </PageLayout>
    );

    function handleDragEnd(event: DragEndEvent) {
        console.log(event.over)
        if (event.over) {
            setIsDropped(event.over.id as string)
        }
    }
}