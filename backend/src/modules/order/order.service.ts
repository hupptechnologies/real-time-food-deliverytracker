import { Order } from './entities/order.entity';
import { AppDataSource } from '../../config/database.config';
import { generateOrderNumber } from '../../utils/helper';
import { OrderStatus } from '../../constants/order-status';
import BadRequestException from '../../exceptions/bad-request.exception';
import { OrderHistory } from './entities/order_history.entity';
import InternalServerErrorException from '../../exceptions/internal-server-error.exception';
import NotFoundException from '../../exceptions/not-found.exception';

class OrderService {
	private orderRepository = AppDataSource.getRepository(Order);
	private orderHistoryRepository = AppDataSource.getRepository(OrderHistory);

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

		if (!savedOrder) {
			throw new InternalServerErrorException('Failed to initiate order!');
		}

		const newHistory = new OrderHistory();
		newHistory.status = 'init';
		newHistory.order_id = savedOrder.id;
		newHistory.order = savedOrder;

		await this.orderHistoryRepository.save(newHistory);

		return savedOrder;
	}

	public async findHistory(userId: number): Promise<Order[]> {
		const history = await this.orderRepository.find({
			where: { customer_id: userId },
		});

		return history;
	}

	public async findOne(orderId: string, userId: number): Promise<Order> {
		const order = await this.orderRepository.findOne({
			where: {
				id: orderId,
				customer_id: userId,
			},
		});

		if (!order) {
			throw new NotFoundException(`Order with ID ${orderId} not found!`);
		}

		return order;
	}
}

export default OrderService;
