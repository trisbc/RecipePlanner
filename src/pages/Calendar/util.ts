export interface IDType {
	locationId: string;
	index: number;
	recipeId: string;
}

export const parseID = (id: string) => {
	const parts = id.split(":");
	return {
		locationId: parts[0],
		index: parseInt(parts[1], 10),
		recipeId: parts[2],
	};
};
