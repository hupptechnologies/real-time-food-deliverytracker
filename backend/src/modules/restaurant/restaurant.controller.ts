/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import RestaurantService from './restaurant.service';

class RestaurantController {
	private restaurantService: RestaurantService;

	constructor(restaurantService: RestaurantService) {
		this.restaurantService = restaurantService;
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
