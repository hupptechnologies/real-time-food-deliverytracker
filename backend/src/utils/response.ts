import { Response } from 'express';

interface ApiResponsePayload<T = any> {
	success: boolean;
	message: string;
	data?: T;
	errorCode?: string | undefined;
}

export function ApiResponse<T>(
	res: Response,
	statusCode: number,
	success: boolean,
	message: string,
	data?: T,
	errorCode?: string | undefined,
): void {
	const payload: ApiResponsePayload<T> = {
		success,
		message,
		data,
		errorCode,
	};
	res.status(statusCode).json(payload);
}
