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
			const newRestaurant = await this.restaurantService.register(body, userId);

			ApiResponse(
				res,
				HttpStatus.CREATED,
				true,
				'Restaurant registerd!',
				newRestaurant,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async createMenuItems(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { restaurantId } = req.params;
			const payload = req.body;

			const newMenuItems = await this.restaurantService.createMenuItems(
				payload,
				Number(restaurantId),
			);

			ApiResponse(
				res,
				HttpStatus.CREATED,
				true,
				'Menu items created successfully!',
				newMenuItems,
			);
		} catch (error: any) {
			next(error);
		}
	}
	public async findMenuItemsByRestaurant(
		req: Request,
		res: Response,
		next: NextFunction,
	) {}
	public async findMenuItemById(
		req: Request,
		res: Response,
		next: NextFunction,
	) {}
	public async updateMenuItem(
		req: Request,
		res: Response,
		next: NextFunction,
	) {}
	public async deleteMenuItem(
		req: Request,
		res: Response,
		next: NextFunction,
	) {}

	public async manageOrder(req: Request, res: Response, next: NextFunction) {
		try {
			const { action } = req.query;
			const { orderId, restaurantId } = req.params;

			await this.restaurantService.manageOrder(
				action as string,
				orderId,
				Number(restaurantId),
			);

			const responseMessage = action === 'accept' ? 'accepted' : 'rejected';
			ApiResponse(res, HttpStatus.OK, true, `Order ${responseMessage}!`);
		} catch (error: any) {
			next(error);
		}
	}

	public async findOrder(req: Request, res: Response, next: NextFunction) {
		try {
			const { orderId, restaurantId } = req.params;

			const order = await this.restaurantService.findOrder(
				orderId,
				Number(restaurantId),
			);

			ApiResponse(
				res,
				HttpStatus.OK,
				true,
				'Order details fetched successfully!',
				order,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async findOrders(req: Request, res: Response, next: NextFunction) {
		try {
			const { restaurantId } = req.params;

			const orders = await this.restaurantService.findOrders(
				Number(restaurantId),
			);

			ApiResponse(
				res,
				HttpStatus.OK,
				true,
				'Orders fetched successfully!',
				orders,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async findCurrentOrders(
		req: Request,
		res: Response,
		next: NextFunction,
	) {}
}

export default RestaurantController;
