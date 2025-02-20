import HttpException from './http-exception';
import { HttpStatus } from '../constants/http-status';

class ForbiddenException extends HttpException {
	constructor(message: string = 'Forbidden', errorCode: string = 'Forbidden') {
		super(HttpStatus.FORBIDDEN, message, errorCode);
	}
}

export default ForbiddenException;
