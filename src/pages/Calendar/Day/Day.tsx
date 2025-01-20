import { FC } from "react";
import { Title } from "@mantine/core";
import { BottomSlot, InbetweenSlot } from "./components";
import { RecipeType } from "@/types/recipeType";
import { DayState, days, useCalendarStore } from "@/store/useCalendarStore";
import { RecipeCard } from "@/components/Recipes/RecipeCard";
import classes from "./Day.module.css";
import { IDType } from "../util";

interface DayProps {
	day: days;
	recipeCards?: RecipeType[];
	activeItem?: IDType;
}

export const Day: FC<DayProps> = ({ day, activeItem }) => {
	const { wrapper, spacer, recipeWrapper, spacerBottom, title } = classes;
	const dayState = useCalendarStore().calendarStore[day] as DayState;
	const recipes = dayState.recipes;
	return (
		<div className={wrapper}>
			<Title order={2} className={title}>
				{day}
			</Title>
			<div className={spacer} />
			<div className={recipeWrapper}>
				{recipes.map((recipeId, index) =>
					recipeId ? (
						<>
							<InbetweenSlot
								day={day as string}
								index={index}
								key={`${day}.${index}.slot`}
							/>
							<RecipeCard
								key={`${day}.${index}.card`}
								id={recipeId}
								location={day}
								index={index}
								activeItem={activeItem}
							/>
						</>
					) : null,
				)}
				<BottomSlot day={day as string} index={recipes.length} />
			</div>
			{/* <div className={spacerBottom} /> */}
		</div>
	);
};
