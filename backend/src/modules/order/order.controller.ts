/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import OrderService from './order.service';

class OrderController {
	private orderService: OrderService;

	constructor(orderService: OrderService) {
		this.orderService = orderService;
	}

	public async create(req: Request, res: Response, next: NextFunction) {}
	public async update(req: Request, res: Response, next: NextFunction) {}
	public async findOne(req: Request, res: Response, next: NextFunction) {}
	public async findAll(req: Request, res: Response, next: NextFunction) {}
	public async remove(req: Request, res: Response, next: NextFunction) {}
}

export default OrderController;
