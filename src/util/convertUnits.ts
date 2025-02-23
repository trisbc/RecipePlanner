import { volumeUnits, weightUnits } from "@/types";

const weightConversionRates: { [key in weightUnits]: number } = {
	mg: 1,
	g: 1000,
	kg: 1000000,
	oz: 28349.5,
	lb: 453592,
};

export function convertWeight(
	value: number,
	fromUnit: weightUnits,
	toUnit: weightUnits,
): number {
	const valueInMg = value * weightConversionRates[fromUnit];
	return valueInMg / weightConversionRates[toUnit];
}

const volumeConversionRates: { [key in volumeUnits]: number } = {
	ml: 1,
	l: 1000,
	cup: 240,
	pint: 473,
	quart: 946,
	gallon: 3785,
	tsp: 4.929,
	tbsp: 14.787,
};

export function convertVolume(
	value: number,
	fromUnit: volumeUnits,
	toUnit: volumeUnits,
): number {
	const valueInMl = value * volumeConversionRates[fromUnit];
	return valueInMl / volumeConversionRates[toUnit];
}
