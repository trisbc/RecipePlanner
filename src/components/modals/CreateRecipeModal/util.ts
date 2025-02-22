import { useIngredientStore } from "@/store";
import { useMemo } from "react";

export const useGroupedIngredients = () => {
	const { ingredientStore } = useIngredientStore();
	const initialGroupedItems: Record<
		string,
		{ label: string; value: string }[]
	> = {
		uncategorized: [
			{
				label: "＋ Create ingredient",
				value: "create_new",
			},
		],
	};

	const groupedItems: {
		group: string;
		items: {
			label: string;
			value: string;
		}[];
	}[] = useMemo(() => {
		const groupMap = Object.entries(ingredientStore).reduce(
			(accumulator, [key, { category, item }]) => {
				let group = "uncategorized";
				if (category) group = category;
				const currentGroup =
					group in accumulator ? accumulator[group] : [];
				accumulator[group] = [
					...currentGroup,
					{ label: item, value: key },
				].sort((a, b) => {
					if (a.value === "create_new") return 1;
					else if (b.value === "create_new") return -1;
					return a.label.localeCompare(b.label);
				});
				return accumulator;
			},
			initialGroupedItems,
		);

		return Object.entries(groupMap)
			.map(([group, items]) => ({ group, items }))
			.sort(({ group: groupA }, { group: groupB }) =>
				groupA.localeCompare(groupB),
			);
	}, [ingredientStore]);

	console.log("groupedItems", groupedItems);
	return groupedItems;
};
