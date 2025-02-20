import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import { ApiResponse } from '../../utils/response';
import { HttpStatus } from '../../constants/http-status';

class AuthController {
	private authService: AuthService;
	private readonly jwtExpiresIn = process.env.JWT_EXPIRES_IN || '4d';

	constructor(authService: AuthService) {
		this.authService = authService;
	}

	public async register(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const userData = req.body;
			const { token, newUser } = await this.authService.registerUser(userData);
			this.setJwtCookie(res, token);
			ApiResponse(
				res,
				HttpStatus.CREATED,
				true,
				'User registerd successfully!',
				newUser,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async login(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const loginData = req.body;
			const token = await this.authService.loginUser(loginData);

			this.setJwtCookie(res, token);
			ApiResponse(res, HttpStatus.OK, true, 'Logged in successfully');
		} catch (error: any) {
			next(error);
		}
	}

	private setJwtCookie(res: Response, token: string): void {
		res.cookie('authToken', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: this.parseJwtExpiryToMs(this.jwtExpiresIn),
			path: '/',
		});
	}

	private parseJwtExpiryToMs(expiresIn: string): number {
		const match = expiresIn.match(/(\d+)([smhd])/);
		if (!match) {
			return 0;
		}

		const value = parseInt(match[1], 10);
		const unit = match[2];

		switch (unit) {
			case 's':
				return value * 1000;
			case 'm':
				return value * 60 * 1000;
			case 'h':
				return value * 60 * 60 * 1000;
			case 'd':
				return value * 24 * 60 * 60 * 1000;
			default:
				return 0;
		}
	}
}

export default AuthController;
