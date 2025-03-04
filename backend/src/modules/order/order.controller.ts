/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import OrderService from './order.service';
import { ApiResponse } from '../../utils/response';
import { HttpStatus } from '../../constants/http-status';
import { orderMessages } from '../../constants/messages';

class OrderController {
	private orderService: OrderService;

	constructor(orderService: OrderService) {
		this.orderService = orderService;
	}

	public async create(req: Request, res: Response, next: NextFunction) {
		try {
			const payload = req.body;
			payload.customer_id = req?.user?.id;

			const newOrder = await this.orderService.create(payload);
			ApiResponse(
				res,
				HttpStatus.CREATED,
				true,
				orderMessages.INIT_SUCCESS,
				newOrder,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async findHistory(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.user?.id as number;
			const orderHistory = await this.orderService.findHistory(userId);
			ApiResponse(
				res,
				HttpStatus.OK,
				true,
				orderMessages.HISTORY_FETCH_SUCCESS,
				orderHistory,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async findOne(req: Request, res: Response, next: NextFunction) {
		try {
			const { id: orderId } = req.params;
			const userId = req.user?.id as number;
			const order = await this.orderService.findOne(orderId, userId);
			ApiResponse(
				res,
				HttpStatus.OK,
				true,
				orderMessages.DETAILS_FETCH_SUCCESS,
				order,
			);
		} catch (error) {
			next(error);
		}
	}
	public async cancel(req: Request, res: Response, next: NextFunction) {}
}

export default OrderController;
