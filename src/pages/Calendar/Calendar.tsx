import { DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { Day } from "./Day";
import { Box, SegmentedControl, Text } from "@mantine/core";
import { PageLayout } from "../../layouts/PageLayout";
import { RecipeCardNoDragging } from "@/components/Recipes/RecipeCard";
import { useState } from "react";
import { days, useCalendarStore } from "@/store/useCalendarStore";
import classes from "./Calendar.module.css";
import { Drawer } from "./Drawer";
import { IDType, parseID } from "./util";

export const Calendar = () => {
	const { spacer, daysControl } = classes;
	const [activeItem, setActiveItem] = useState<IDType | undefined>();
	const [numDays, setNumDays] = useState<"seven-day" | "three-day">(
		"seven-day",
	);
	const { moveRecipe, nullRecipe } = useCalendarStore();
	return (
		<PageLayout
			title="Calendar"
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart} /*collisionDetection={closestCenter}*/
		>
			<Box className={daysControl}>
				<Box>
					<Text component="label" lh="32px" fz="14px" fw="500">
						Number of days
					</Text>
				</Box>

				<SegmentedControl
					w="200px"
					value={numDays}
					onChange={(value) =>
						setNumDays(value as "seven-day" | "three-day")
					}
					data={[
						{ label: "Three", value: "three-day" },
						{ label: "Seven", value: "seven-day" },
					]}
				/>
			</Box>
			<DragOverlay style={{ width: "100vw" }} dropAnimation={null}>
				{activeItem && (
					<RecipeCardNoDragging
						location={activeItem.locationId}
						index={activeItem.index}
						id={activeItem.recipeId}
						widthClass={numDays}
					/>
				)}
			</DragOverlay>

			<Box className={spacer}>
				<Day day="monday" />
				<Day day="tuesday" />
				<Day day="wednesday" />
				{numDays === "seven-day" && (
					<>
						<Day day="thursday" />
						<Day day="friday" />
						<Day day="saturday" />
						<Day day="sunday" />
					</>
				)}
			</Box>
			<Drawer numDays={numDays} activeItem={activeItem} />
		</PageLayout>
	);
	function handleDragEnd(event: DragEndEvent) {
		setActiveItem(undefined);
		const from = parseID(event.active.id as string);
		const to = event.over ? parseID(event.over.id as string) : from;
		const isFromDrawer = from.locationId === "drawer";
		if (to) {
			const moveFrom = isFromDrawer
				? undefined
				: { day: from.locationId as days, index: from.index };
			moveRecipe(
				from.recipeId,
				{ day: to.locationId as days, index: to.index },
				moveFrom,
			);
		}
	}
	function handleDragStart(event: DragStartEvent) {
		const from = parseID(event.active.id as string);
		const isFromDrawer = from.locationId === "drawer";
		if (!isFromDrawer) {
			nullRecipe(from.locationId, from.index);
		}
		setActiveItem(parseID(event.active.id as string));
	}
};
