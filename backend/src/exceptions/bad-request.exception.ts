import { HttpStatus } from '../constants/http-status';
import HttpException from './http-exception';

class BadRequestException extends HttpException {
	constructor(
		message: string = 'Bad Request',
		errorCode: string = 'BadRequest',
	) {
		super(HttpStatus.BAD_REQUEST, message, errorCode);
	}
}

export default BadRequestException;
