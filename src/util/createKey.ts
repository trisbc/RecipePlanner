export const createKey = (name: string) => {
	return name
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, "")
		.replace(/\s+/g, "-");
};
