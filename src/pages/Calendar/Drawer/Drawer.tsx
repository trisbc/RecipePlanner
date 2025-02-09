import { FC, useState } from "react";
import classes from "./Drawer.module.css";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import { useCalendarStore } from "@/store/useCalendarStore";
import { RecipeCard } from "@/components/Recipes/RecipeCard";
import { IDType } from "../util";
import { useBreakpoints } from "@/hooks/useBreakpoints";

export const Drawer: FC<{
	numDays: "three-day" | "seven-day";
	activeItem?: IDType;
	disableScroll?: boolean;
}> = ({ numDays, activeItem, disableScroll }) => {
	const drawerItems = useCalendarStore().calendarStore.drawer;
	const { drawerWrapper, drawerHandle, recipeContainer, noScroll } = classes;
	const [open, setOpen] = useState(false);
	const { isSmallScreen } = useBreakpoints();
	return (
		<div className={drawerWrapper}>
			<button
				className={drawerHandle}
				type="button"
				onClick={() => setOpen((prev) => !prev)}
			>
				{open ? <FiChevronsDown /> : <FiChevronsUp />}
			</button>
			{open && (
				<div
					className={`${recipeContainer}${disableScroll ? ` ${noScroll}` : ""}`}
				>
					{drawerItems.map((id, index) => (
						<RecipeCard
							id={id}
							index={index}
							key={`${index}.${id}`}
							location="drawer"
							widthClass={isSmallScreen ? "full-width" : numDays}
							activeItem={activeItem}
						/>
					))}
				</div>
			)}
		</div>
	);
};
