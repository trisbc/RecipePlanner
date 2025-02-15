import { FC, useState } from "react";
import { Button, Title } from "@mantine/core";
import { BottomSlot, InbetweenSlot } from "./components";
import { RecipeType } from "@/types/recipeType";
import { days, useCalendarStore } from "@/store/useCalendarStore";
import { RecipeCard } from "@/components/cards";
import classes from "./Day.module.css";
import { IDType } from "../util";
import { DayState, dayType } from "@/types";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { FiPlus } from "react-icons/fi";
import { useSettingsStore } from "@/store/useSettingsStore";
import { AddRecipeModal } from "@/components/modals/AddRecipeModal";

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

	const [isAddOpen, setIsAddOpen] = useState(false);

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
					<>
						<Button
							className={addButton}
							onClick={() => setIsAddOpen(true)}
						>
							<FiPlus size={16} />
							&ensp;Add Recipe
						</Button>
						<AddRecipeModal
							isOpen={isAddOpen}
							onClose={() => setIsAddOpen(false)}
							day={day as dayType}
						/>
					</>
				) : (
					<BottomSlot day={day as string} index={recipes.length} />
				)}
			</div>
		</div>
	);
};
