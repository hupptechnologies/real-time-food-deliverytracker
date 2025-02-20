import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ApiResponse } from '../utils/response';
import { HttpStatus } from '../constants/http-status';

function validationMiddleware<T extends object>(
	dtoClass: new (..._args: any[]) => T,
) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const dtoInstance = plainToClass(dtoClass, req.body);
		const errors: ValidationError[] = await validate(dtoInstance);

		if (errors.length > 0) {
			const constraints = errors[0].constraints || {};
			const errorMessage = Object.values(constraints)[0];

			ApiResponse(res, HttpStatus.BAD_REQUEST, false, errorMessage);
		} else {
			next();
		}
	};
}

export default validationMiddleware;
