export const parseTime = (timeString: string) => {
	let totalMinutes = 0;
	if (timeString.includes(":")) {
		const [hours, minutes] = timeString.split(":").map(Number);
		totalMinutes = hours * 60 + minutes;
	} else {
		totalMinutes = parseInt(timeString, 10);
	}
	return totalMinutes;
};

export const formatTime = (numMinutes: number) => {
	const formattedHours = Math.floor(numMinutes / 60)
		.toString()
		.padStart(2, "0");
	const formattedMinutes = (numMinutes % 60).toString().padStart(2, "0");
	return `${formattedHours}:${formattedMinutes}`;
};
