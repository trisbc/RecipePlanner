import { DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { Day } from "./Day";
import {
	Box,
	Button,
	NativeSelect,
	SegmentedControl,
	Select,
	Text,
	useMantineTheme,
} from "@mantine/core";
import { PageLayout } from "../../layouts/PageLayout";
import { RecipeCardNoDragging } from "@/components/Recipes/RecipeCard";
import { useState } from "react";
import { days, useCalendarStore } from "@/store/useCalendarStore";
import classes from "./Calendar.module.css";
import { Drawer } from "./Drawer";
import { IDType, parseID } from "./util";
import { Carousel } from "./Carousel";
import { dayType, numDaysType } from "@/types";
import SettingsPopover from "@/components/SettingsPopover/SettingsPopover";
import { useMediaQuery } from "@mantine/hooks";
import { getOrderedDayList } from "@/constants";

export const Calendar = () => {
	const { daysControl, select } = classes;
	const [activeItem, setActiveItem] = useState<IDType | undefined>();
	const [numDays, setNumDays] = useState<numDaysType>("seven-day");
	const { moveRecipe, nullRecipe } = useCalendarStore();
	const [startDay, setStartDay] = useState<dayType>("monday");
	const [disableScroll, setDisableScroll] = useState(false);
	const { breakpoints } = useMantineTheme();
	console.log(breakpoints.sm);
	const match = useMediaQuery(`(max-width: ${breakpoints.sm})`);
	console.log(match);
	return (
		<PageLayout
			title="Calendar"
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart} /*collisionDetection={closestCenter}*/
			autoScroll={false}
		>
			<Box className={daysControl}>
				<SettingsPopover title="Calendar settings">
					<Box>
						<Text component="label" lh="32px" fz="14px" fw="500">
							Number of days
						</Text>
					</Box>

					<SegmentedControl
						w="200px"
						value={numDays}
						onChange={(value) => setNumDays(value as numDaysType)}
						data={[
							{ label: "Three", value: "three-day" },
							{ label: "Seven", value: "seven-day" },
						]}
					/>
					<NativeSelect
						className={select}
						value={startDay}
						label="Start Day"
						onChange={(e) =>
							setStartDay(e.currentTarget.value as dayType)
						}
						data={getOrderedDayList(startDay).map((day) => ({
							label: day,
							value: day,
						}))}
					/>
				</SettingsPopover>
			</Box>

			<Carousel {...{ numDays, startDay }} />

			<Drawer
				numDays={numDays}
				activeItem={activeItem}
				disableScroll={disableScroll}
			/>
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
		setDisableScroll(false);
	}
	function handleDragStart(event: DragStartEvent) {
		const from = parseID(event.active.id as string);
		const isFromDrawer = from.locationId === "drawer";
		if (!isFromDrawer) {
			nullRecipe(from.locationId, from.index);
		}
		setActiveItem(parseID(event.active.id as string));
		setDisableScroll(true);
	}
};
