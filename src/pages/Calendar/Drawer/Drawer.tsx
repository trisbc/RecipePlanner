import { FC, useState } from "react";
import classes from "./Drawer.module.css";
import { FiChevronsDown, FiChevronsUp, FiPlus } from "react-icons/fi";
import { useCalendarStore } from "@/store/useCalendarStore";
import { RecipeCard } from "@/components/cards";
import { IDType } from "../util";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { ThemeButton } from "@/components/buttons/ThemeButton";
import { AddRecipeModal } from "@/components/modals/AddRecipeModal";

const { drawerWrapper, drawerHandle, recipeContainer, noScroll, addRecipe } =
	classes;

export const Drawer: FC<{
	numDays: "three-day" | "seven-day";
	activeItem?: IDType;
	disableScroll?: boolean;
}> = ({ numDays, activeItem, disableScroll }) => {
	const drawerItems = useCalendarStore().calendarStore.drawer;
	const [open, setOpen] = useState(false);
	const [isAddOpen, setIsAddOpen] = useState(false);
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
					<button
						className={`${addRecipe} ${classes[numDays]}`}
						onClick={() => setIsAddOpen(true)}
					>
						+ Add Recipe
					</button>
					<AddRecipeModal
						isOpen={isAddOpen}
						onClose={setIsAddOpen}
						day={"drawer"}
					/>
				</div>
			)}
		</div>
	);
};
