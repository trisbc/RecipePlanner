import { Box, Button } from "@mantine/core";
import { Day } from "../Day";
import classes from "./Carousel.module.css";

import { FC, SetStateAction, useState } from "react";
import { dayType, numDaysType } from "@/types";
import { getVisibleDays } from "./util";

interface CarouselProps {
	startDay: dayType;
	numDays: numDaysType;
}

export const Carousel: FC<CarouselProps> = ({ startDay, numDays }) => {
	const { carouselSpacer } = classes;

	const [startIndex, setStartIndex] = useState(0);
	const {
		days: visibleDays,
		visibleIndices,
		indices,
		dayList,
	} = getVisibleDays({
		startDay,
		numDays,
		startIndex,
	});
	const disableBack = startIndex === 0;
	const disableForward = startIndex + 3 >= 7;
	return (
		<>
			<Box className={carouselSpacer}>
				{visibleDays.map((day) => (
					<Day day={day} key={day} />
				))}
			</Box>
			{visibleDays.length !== 7 && (
				<Pagination
					onChange={setStartIndex}
					{...{
						visibleIndices,
						indices,
						disableBack,
						disableForward,
						dayList,
					}}
				/>
			)}
		</>
	);
};

interface PaginationProps {
	onChange: (value: SetStateAction<number>) => void;
	disableBack?: boolean;
	disableForward?: boolean;
	visibleIndices: number[];
	indices: number[];
	dayList: dayType[];
}

const Pagination: FC<PaginationProps> = ({
	onChange,
	disableBack,
	disableForward,
	visibleIndices,
	indices,
	dayList,
}) => {
	const { carouselPagination, endCapButton, square, circle } = classes;
	return (
		<Box className={carouselPagination}>
			<Button
				className={endCapButton}
				disabled={disableBack}
				aria-disabled={disableBack}
				onClick={() =>
					onChange((currentIndex) => Math.max(currentIndex - 2, 0))
				}
			>
				⮜ Back
			</Button>

			{indices.map((index) => (
				<Button
					className={visibleIndices.includes(index) ? square : circle}
					onClick={() => onChange(Math.min(index, 4))}
					title={dayList.at(index)}
				/>
			))}

			{/* <Button className={square} />
			<Button className={square} />
			<Button className={circle} />
			<Button className={circle} />
			<Button className={circle} />
			<Button className={circle} /> */}

			<Button
				className={endCapButton}
				disabled={disableForward}
				aria-disabled={disableForward}
				onClick={() =>
					onChange((currentIndex) => Math.min(currentIndex + 2, 4))
				}
			>
				Forward ➤
			</Button>
		</Box>
	);
};
