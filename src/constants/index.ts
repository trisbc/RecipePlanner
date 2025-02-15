import { dayType } from "@/types";
import * as validationMessages from "./validationMessages"

export { validationMessages };

export const dayList: dayType[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

export const getOrderedDayList = (startDay: dayType) => {
    const firstDayIndex = dayList.indexOf(startDay);
	return [
		...dayList.slice(firstDayIndex),
		...dayList.slice(0, firstDayIndex),
	]
}