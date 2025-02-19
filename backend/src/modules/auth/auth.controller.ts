import { Request, Response } from 'express';
import AuthService from './auth.service';
import { successResponse, errorResponse } from '../../utils/response';

class AuthController {
	private authService: AuthService;

	constructor(authService: AuthService) {
		this.authService = authService;
	}

	public async register(req: Request, res: Response): Promise<void> {
		try {
			const userData = req.body;
			const registeredUser = await this.authService.registerUser(userData);

			res
				.status(201)
				.json(successResponse(registeredUser, 'User registerd successfully!'));
		} catch (error: any) {
			res
				.status(500)
				.json(errorResponse(error.message || 'Registration failed'));
		}
	}

	public async login(req: Request, res: Response): Promise<void> {
		try {
			const loginData = req.body;
			const token = await this.authService.loginUser(loginData);

			res
				.status(200)
				.json(successResponse({ token }, 'User logged in successfully'));
		} catch (error: any) {
			res
				.status(401)
				.json(errorResponse(error.message || 'Invalid credentials'));
		}
	}
}

export default AuthController;
