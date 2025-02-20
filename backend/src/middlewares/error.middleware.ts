import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http-exception';
import { ApiResponse } from '../utils/response';
import { HttpStatus } from '../constants/http-status';

function errorMiddleware(
	error: any,
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction,
) {
	let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
	let message = 'Something went wrong';
	let errorCode = 'InternalServerError';

	if (error instanceof HttpException) {
		statusCode = error.statusCode;
		message = error.message;
		errorCode = error.errorCode;
	} else if (error instanceof Error) {
		message = error.message;
	}

	console.error('ERROR HANDLER:', error);

	ApiResponse(res, statusCode, false, message, undefined, errorCode);
}

export default errorMiddleware;
