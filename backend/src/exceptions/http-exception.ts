class HttpException extends Error {
	public statusCode: number;
	public message: string;
	public errorCode: string;

	constructor(statusCode: number, message: string, errorCode?: string) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.errorCode = errorCode || 'HttpException';
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}
}

export default HttpException;
