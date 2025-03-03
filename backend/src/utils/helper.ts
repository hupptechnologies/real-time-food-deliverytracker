export const generateOrderNumber = (): string => {
	const timestamp = Date.now().toString(36).toUpperCase();
	const randomness = Math.random().toString(36).toUpperCase().slice(2, 7);
	return 'ORD' + timestamp + randomness;
};
