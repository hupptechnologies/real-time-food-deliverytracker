import { Order } from './entities/order.entity';
import { AppDataSource } from '../../config/database.config';
import { generateOrderNumber } from '../../utils/helper';
import { OrderStatus } from '../../constants/order-status';
import BadRequestException from '../../exceptions/bad-request.exception';

class OrderService {
	private orderRepository = AppDataSource.getRepository(Order);

	public async create(payload: any): Promise<Order> {
		if (!payload.order_number) {
			payload.order_number = generateOrderNumber();
		}

		const isDuplicateOrder = await this.orderRepository.findOne({
			where: { order_number: payload.order_number },
		});

		if (isDuplicateOrder) {
			throw new BadRequestException(
				'Order with this Order Number already exist',
			);
		}

		const order = new Order();
		order.restaurant_id = payload.restaurant_id;
		order.customer_id = payload.customer_id;
		order.status = OrderStatus.INIT;
		order.order_number = payload.order_number;
		order.address = payload.address;

		const orderTotal = payload.order_items.reduce(
			(acc: number, curr: any) => acc + Number(curr.price || 0),
			0,
		);

		order.order_total = orderTotal;
		const savedOrder = await this.orderRepository.save(order);

		// TODO: Process Order Items
		// TODO: Add history

		return savedOrder;
	}
}

export default OrderService;
