import { FC } from "react";
import { Button, Title } from "@mantine/core";
import { BottomSlot, InbetweenSlot } from "./components";
import { RecipeType } from "@/types/recipeType";
import { days, useCalendarStore } from "@/store/useCalendarStore";
import { RecipeCard } from "@/components/cards";
import classes from "./Day.module.css";
import { IDType } from "../util";
import { DayState } from "@/types";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { FiPlus } from "react-icons/fi";
import { useSettingsStore } from "@/store/useSettingsStore";

interface DayProps {
	day: days;
	recipeCards?: RecipeType[];
	activeItem?: IDType;
}
const { wrapper, spacer, recipeWrapper, title, addButton } = classes;

export const Day: FC<DayProps> = ({ day, activeItem }) => {
	const { isSmallScreen } = useBreakpoints();
	const {
		settingsStore: { useDraggable },
	} = useSettingsStore();
	const recipes = useCalendarStore().calendarStore[day] as DayState;
	const disableDrag = isSmallScreen || !useDraggable;
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
				{disableDrag ? (
					<Button className={addButton} leftSection={<FiPlus />}>
						Add Recipe
					</Button>
				) : (
					<BottomSlot day={day as string} index={recipes.length} />
				)}
			</div>
		</div>
	);
};
