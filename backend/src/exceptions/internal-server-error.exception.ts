import HttpException from './http-exception';
import { HttpStatus } from '../constants/http-status';

class InternalServerErrorException extends HttpException {
	constructor(
		message: string = 'Internal Server Error',
		errorCode: string = 'InternalServerError',
	) {
		super(HttpStatus.INTERNAL_SERVER_ERROR, message, errorCode);
	}
}

export default InternalServerErrorException;
