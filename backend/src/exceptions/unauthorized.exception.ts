import HttpException from './http-exception';
import { HttpStatus } from '../constants/http-status';

class UnauthorizedException extends HttpException {
	constructor(
		message: string = 'Unauthorized',
		errorCode: string = 'Unauthorized',
	) {
		super(HttpStatus.UNAUTHORIZED, message, errorCode);
	}
}

export default UnauthorizedException;
