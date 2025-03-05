import { AppDataSource } from '../../config/database.config';
import { OrderStatus } from '../../constants/order-status';
import BadRequestException from '../../exceptions/bad-request.exception';
import NotFoundException from '../../exceptions/not-found.exception';
import { Order } from '../order/entities/order.entity';
import { OrderHistory } from '../order/entities/order_history.entity';
import { Restaurant } from './entities/restaurant.entity';

class RestaurantService {
	private orderRepository = AppDataSource.getRepository(Order);
	private orderHistoryRepository = AppDataSource.getRepository(OrderHistory);
	private restaurantRepository = AppDataSource.getRepository(Restaurant);

	public async register(payload: any, userId: number): Promise<Restaurant> {
		const isRestaurantExist = await this.restaurantRepository.findOne({
			where: { owner_id: userId },
		});

		if (isRestaurantExist) {
			throw new BadRequestException(
				'A Restaurant already registered with this account',
			);
		}

		const restaurant = new Restaurant();
		restaurant.name = payload.name;
		restaurant.owner_id = userId;
		restaurant.address = payload.address;

		const savedRestaurant = await this.restaurantRepository.save(restaurant);

		return savedRestaurant;
	}

	public async manageOrder(
		action: string,
		orderId: string,
		restaurantId: number,
	) {
		const order = await this.findOrder(orderId, restaurantId);
		const newStatus =
			action === 'accept' ? OrderStatus.PREPARING : OrderStatus.REJECTED;

		order.status = newStatus;
		const updatedOrder = await this.orderRepository.save(order);

		const newHistory = new OrderHistory();
		newHistory.status = OrderStatus.INIT;
		newHistory.order_id = updatedOrder.id;
		newHistory.order = updatedOrder;

		await this.orderHistoryRepository.save(newHistory);
		// TODO: Notify User and Initiate driver assignment
	}

	public async findOrder(
		order_id: string,
		restaurant_id: number,
	): Promise<Order> {
		const order = await this.orderRepository.findOne({
			where: { id: order_id, restaurant_id },
		});
		if (!order) {
			throw new NotFoundException(`Order not found with ID ${order_id}`);
		}
		return order;
	}
}

export default RestaurantService;
