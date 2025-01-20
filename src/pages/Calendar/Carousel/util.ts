import { dayList, getOrderedDayList } from "@/constants";
import { dayType, numDaysType } from "@/types";

interface getVisibleDaysArgs {
	numDays: numDaysType;
	startDay: dayType;
	startIndex: number;
}

export const getVisibleDays = ({
	numDays,
	startDay,
	startIndex,
}: getVisibleDaysArgs) => {
    const indices = [
        0, 1, 2, 3, 4, 5, 6
    ]
	const orderedDays = getOrderedDayList(startDay);
	if (numDays === "seven-day") {
		return { days: orderedDays, indices, visibleIndices: indices, dayList: orderedDays};
	}
	return { days: orderedDays.slice(startIndex, startIndex + 3), visibleIndices: indices.slice(startIndex, startIndex + 3), indices, dayList: orderedDays };
};