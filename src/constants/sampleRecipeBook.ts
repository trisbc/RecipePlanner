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
	ingredientState: {},
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
