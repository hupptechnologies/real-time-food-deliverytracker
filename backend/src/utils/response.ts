interface ApiResponse<T> {
	success: boolean;
	message?: string;
	error?: string | null;
	data?: T | null;
}

export function successResponse<T>(
	data: T | null,
	message: string = 'Success',
): ApiResponse<T> {
	return {
		success: true,
		message: message,
		data: data,
	};
}

export function errorResponse<T>(error: string): ApiResponse<T> {
	return {
		success: false,
		error: error,
	};
}
