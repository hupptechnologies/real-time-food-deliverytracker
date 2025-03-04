/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import OrderService from './order.service';
import { ApiResponse } from '../../utils/response';
import { HttpStatus } from '../../constants/http-status';

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
			ApiResponse(res, HttpStatus.CREATED, true, 'Order initiated!', newOrder);
		} catch (error: any) {
			next(error);
		}
	}

	public async update(req: Request, res: Response, next: NextFunction) {}
	public async findOne(req: Request, res: Response, next: NextFunction) {}
	public async findAll(req: Request, res: Response, next: NextFunction) {}
	public async remove(req: Request, res: Response, next: NextFunction) {}
}

export default OrderController;
