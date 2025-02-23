import { FC } from "react";
import { DraggableAttributes, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Box, Checkbox, Group, Text, Title } from "@mantine/core";
import {
	FiMove,
	FiEdit,
	FiTrash,
	FiMoreHorizontal,
	FiClock,
	FiDollarSign,
} from "react-icons/fi";
import classes from "./RecipeCard.module.css";
import { days, useCalendarStore } from "@/store/useCalendarStore";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { IDType } from "@/pages/Calendar/util";
import { useBreakpoints } from "@/hooks/useBreakpoints";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useRecipeStore } from "@/store/useRecipeStore";
import { formatTime } from "@/util/parseTime";

const {
	cardWrapper,
	cardWrapperInvisible,
	checkboxCardWrapper,
	buttonStack,
	iconButton,
	dragHandle,
	content,
	cardCheckbox,
	checkboxMetricsLabel,
	checkBoxContent,
} = classes;

interface RecipeCardProps {
	id: string;
	location: "drawer" | days;
	index: number;
	widthClass?: "seven-day" | "three-day" | "full-width";
	activeItem?: IDType;
}

interface RecipeCardContentProps {
	id: string;
	attributes?: DraggableAttributes;
	listeners?: SyntheticListenerMap | undefined;
	handleDelete?: () => void;
}

const RecipeCardContent: FC<RecipeCardContentProps> = ({
	id,
	listeners,
	attributes,
	handleDelete,
}) => {
	const { isSmallScreen } = useBreakpoints();
	const {
		settingsStore: { useDraggable },
	} = useSettingsStore();
	const { recipeStore } = useRecipeStore();
	const { title, description, prepTime, cookTime } = recipeStore[id];
	return (
		<>
			<div className={buttonStack}>
				{!isSmallScreen && useDraggable ? (
					<button
						{...listeners}
						{...attributes}
						className={`${iconButton} ${dragHandle}`}
						type="button"
					>
						<FiMove color="black" />
					</button>
				) : (
					<button className={`${iconButton}`} type="button">
						<FiMoreHorizontal color="black" />
					</button>
				)}
				<button className={iconButton} type="button">
					<FiEdit color="black" />
				</button>
				<button
					className={iconButton}
					onClick={handleDelete}
					type="button"
				>
					<FiTrash color="black" />
				</button>
			</div>
			<div className={content}>
				<Title order={3} fz="sm" lh="md" fw="normal">
					{title}
				</Title>

				{description && <Text fz="xs">{description}</Text>}

				{(cookTime || prepTime) && (
					<Text fz="xs" fw="bold">
						{(cookTime ?? 0) + (prepTime ?? 0)} minutes
					</Text>
				)}
			</div>
		</>
	);
};

export const RecipeCardNoDragging: FC<RecipeCardProps> = ({
	id,
	widthClass,
}) => {
	let className = cardWrapper;
	if (widthClass) {
		className += ` ${classes[widthClass]}`;
	}

	return (
		<div className={className}>
			<RecipeCardContent id={id} />
		</div>
	);
};

export const RecipeCard: FC<RecipeCardProps> = ({
	id,
	location,
	index,
	widthClass,
	activeItem,
}) => {
	let className = cardWrapper;
	let invisClassName = cardWrapperInvisible;
	if (widthClass) {
		className += ` ${classes[widthClass]}`;
		invisClassName += ` ${classes[widthClass]}`;
	}

	const computedActiveItem = `${activeItem?.locationId}:${activeItem?.index}:${activeItem?.recipeId}`;
	const computedID = `${location}:${index}:${id}`;
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: computedID,
	});

	const style = {
		transform: CSS.Translate.toString(transform),
	};

	const { deleteRecipe } = useCalendarStore();
	if (computedActiveItem === computedID) {
		return <div className={invisClassName} />;
	}
	return (
		<div ref={setNodeRef} style={style} className={className}>
			<RecipeCardContent
				id={id}
				listeners={listeners}
				attributes={attributes}
				handleDelete={() => {
					deleteRecipe(location, index);
				}}
			/>
		</div>
	);
};

interface CheckboxCardProps {
	id: string;
	onClick: (id: string) => void;
	selected: boolean;
}

export const RecipeCardCheckBox: FC<CheckboxCardProps> = ({
	id,
	onClick,
	selected,
}) => {
	const { recipeStore } = useRecipeStore();
	const { title, description, prepTime, cookTime } = recipeStore[id];
	return (
		<div className={`${cardWrapper} ${checkboxCardWrapper}`}>
			<div className={checkBoxContent}>
				<Checkbox
					autoContrast
					color="var(--primary-color-4)"
					className={cardCheckbox}
					checked={selected}
					onChange={() => onClick(id)}
					label={
						<Group wrap="nowrap" gap="lg">
							<Box>
								<Title order={3} fz="sm" lh="md" fw="normal">
									{title}
								</Title>

								<Text fz="xs">{description}</Text>
							</Box>
							<Box className={checkboxMetricsLabel}>
								{(!!prepTime || !!cookTime) && (
									<Group wrap="nowrap">
										<FiClock
											color="var(--primary-color-4)"
											size={16}
										/>
										<Box className={checkboxMetricsLabel}>
											{formatTime(
												(cookTime ?? 0) +
													(prepTime ?? 0),
											)}
										</Box>
									</Group>
								)}

								<Group wrap="nowrap">
									<FiDollarSign color="green" size={16} />
									<Box className={checkboxMetricsLabel}>
										{/* TODO: Replace this with real data */}
										12.00
									</Box>
								</Group>
							</Box>
						</Group>
					}
				/>
			</div>
		</div>
	);
};
