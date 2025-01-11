import { FC } from 'react';
import { Title } from '@mantine/core';
import { BottomSlot, InbetweenSlot, } from './components';
import { RecipeType } from '@/types/recipeType';
import { DayState, days, useCalendarStore } from '@/store/useCalendarStore';
import { RecipeCard } from '@/components/Recipes/RecipeCard';
import classes from "./Day.module.css"

interface DayProps {
  day: days;
  recipeCards?: RecipeType[]
}

export const Day: FC<DayProps> = ({ day }) => {
  const { wrapper, spacer, "recipes-wrapper": recipeWrapper, "spacer-bottom": spacerBottom, title } = classes
  const dayState = useCalendarStore().calendarStore[day] as DayState
  const recipes = dayState.recipes
  if (day == "monday") {
    console.log(recipes);
  }
  return (
    <div className={wrapper} >
      <Title order={2} className={title}>{day}</Title>
      <div className={spacer} />
      <div className={recipeWrapper}>
        {recipes.map((recipeId, index) => (
          recipeId 
          ? 
          (<>
            <InbetweenSlot day={day as string} index={index} />
            <RecipeCard id={recipeId} location={day} index={index} />
          </>) 
          : null
        ))}
        <BottomSlot day={day as string} index={recipes.length} />
      </div>
      <div className={spacerBottom} />
    </div>
  );
}