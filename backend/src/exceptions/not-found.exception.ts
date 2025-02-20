import HttpException from './http-exception';
import { HttpStatus } from '../constants/http-status';

class NotFoundException extends HttpException {
	constructor(message: string = 'Not Found', errorCode: string = 'NotFound') {
		super(HttpStatus.NOT_FOUND, message, errorCode);
	}
}

export default NotFoundException;
