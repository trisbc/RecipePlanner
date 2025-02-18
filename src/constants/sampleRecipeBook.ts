import { RecipeBookFile } from "@/types";

export const blankRecipeBook: Omit<
	RecipeBookFile,
	"filename" | "timeStamp" | "recipeBook" | "settingsState"
> = {
	calendarState: {
		sunday: [],
		monday: [],
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
		saturday: [],
		drawer: [],
	},
	ingredientState: {},
	recipeState: {},
};

export const sampleRecipeBook: Omit<
	RecipeBookFile,
	"filename" | "timeStamp" | "recipeBook" | "settingsState"
> = {
	calendarState: {
		sunday: [],
		monday: [],
		tuesday: [],
		wednesday: [],
		thursday: [],
		friday: [],
		saturday: [],
		drawer: [
			"potatoSoup",
			"brocSoup",
			"tomatoSoup",
			"chickenSoup",
			"carrotSoup",
			"lentilSoup",
			"butternutSoup",
			"frenchOnionSoup",
			"misoSoup",
			"splitPeaSoup",
			"minestroneSoup",
			"clamChowder",
		],
	},
	ingredientState: {
		flour: {
			item: "Flour",
			costPerUnit: { mg: 0.02, ml: 0.01 },
			category: "Baking",
		},
		sugar: {
			item: "Sugar",
			costPerUnit: { mg: 0.03, ml: 0.015 },
			category: "Baking",
		},
		milk: {
			item: "Milk",
			costPerUnit: { ml: 0.05 },
			category: "Dairy",
		},
		butter: {
			item: "Butter",
			costPerUnit: { mg: 0.1 },
			category: "Dairy",
		},
		eggs: {
			item: "Eggs",
			category: "Poultry",
		},
		honey: {
			item: "Honey",
			costPerUnit: { ml: 0.08 },
			category: "Sweeteners",
		},
		yeast: {
			item: "Yeast",
			costPerUnit: { mg: 0.05 },
			category: "Baking",
		},
		salt: {
			item: "Salt",
			costPerUnit: { mg: 0.01 },
			category: "Spices",
		},
		oliveOil: {
			item: "Olive Oil",
			costPerUnit: { ml: 0.12 },
			category: "Oils",
		},
		vanillaExtract: {
			item: "Vanilla Extract",
			costPerUnit: { ml: 0.2 },
			category: "Baking",
		},
		cinnamon: {
			item: "Cinnamon",
			costPerUnit: { mg: 0.04 },
			category: "Spices",
		},
	},
	recipeState: {
		potatoSoup: {
			title: "Potato Soup",
			description: "test description",
			cookTime: 60,
		},
		brocSoup: { title: "Brocolli Cheddar soup", cookTime: 50 },
		tomatoSoup: {
			title: "Tomato Basil Soup",
			description:
				"A classic comfort soup with rich tomato flavor and fresh basil.",
			cookTime: 45,
		},
		chickenSoup: { title: "Chicken Noodle Soup", cookTime: 40 },
		carrotSoup: {
			title: "Carrot Ginger Soup",
			description:
				"A creamy and flavorful soup made with carrots and a hint of ginger spice.",
			cookTime: 35,
		},
		lentilSoup: { title: "Lentil Soup", cookTime: 55 },
		butternutSoup: {
			title: "Butternut Squash Soup",
			description:
				"Smooth, creamy, and slightly sweet soup made with roasted butternut squash.",
			cookTime: 60,
		},
		frenchOnionSoup: { title: "French Onion Soup", cookTime: 75 },
		misoSoup: {
			title: "Miso Soup",
			description:
				"A light and umami-packed Japanese soup with tofu and seaweed.",
			cookTime: 20,
		},
		splitPeaSoup: { title: "Split Pea Soup", cookTime: 50 },
		minestroneSoup: {
			title: "Minestrone Soup",
			description:
				"A hearty Italian vegetable soup with pasta and beans.",
			cookTime: 60,
		},
		clamChowder: { title: "Clam Chowder", cookTime: 45 },
	},
};
