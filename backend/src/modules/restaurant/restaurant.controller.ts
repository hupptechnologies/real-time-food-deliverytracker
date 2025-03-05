/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import RestaurantService from './restaurant.service';
import { ApiResponse } from '../../utils/response';
import { HttpStatus } from '../../constants/http-status';

class RestaurantController {
	private restaurantService: RestaurantService;

	constructor(restaurantService: RestaurantService) {
		this.restaurantService = restaurantService;
	}

	public async register(req: Request, res: Response, next: NextFunction) {
		try {
			const body = req.body;
			const userId = req.user?.id as number;
			const newRole = await this.restaurantService.register(body, userId);

			ApiResponse(
				res,
				HttpStatus.CREATED,
				true,
				'Restaurant registerd!',
				newRole,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async createMenu(req: Request, res: Response, next: NextFunction) {}
	public async updateMenu(req: Request, res: Response, next: NextFunction) {}
	public async findMenu(req: Request, res: Response, next: NextFunction) {}
	public async deleteMenu(req: Request, res: Response, next: NextFunction) {}
	public async manageOrder(req: Request, res: Response, next: NextFunction) {}
	public async findOrders(req: Request, res: Response, next: NextFunction) {}
	public async findCurrentOrders(
		req: Request,
		res: Response,
		next: NextFunction,
	) {}
}

export default RestaurantController;
