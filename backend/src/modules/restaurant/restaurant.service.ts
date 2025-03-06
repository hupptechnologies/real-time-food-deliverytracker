import { AppDataSource } from '../../config/database.config';
import { OrderStatus } from '../../constants/order-status';
import BadRequestException from '../../exceptions/bad-request.exception';
import InternalServerErrorException from '../../exceptions/internal-server-error.exception';
import NotFoundException from '../../exceptions/not-found.exception';
import { Order } from '../order/entities/order.entity';
import { OrderHistory } from '../order/entities/order_history.entity';
import { Restaurant } from './entities/restaurant.entity';
import { MenuItem } from './entities/menu-item.entity';

class RestaurantService {
	private orderRepository = AppDataSource.getRepository(Order);
	private orderHistoryRepository = AppDataSource.getRepository(OrderHistory);
	private restaurantRepository = AppDataSource.getRepository(Restaurant);
	private menuItemRepository = AppDataSource.getRepository(MenuItem);

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

	public async findOrders(restaurant_id: number): Promise<Order[]> {
		const orders = await this.orderRepository.find({
			where: { restaurant_id },
		});

		return orders;
	}

	public async createMenuItems(
		payload: any,
		restaurant_id: number,
	): Promise<MenuItem[]> {
		const menuItemsToInsert: MenuItem[] = [];
		const menuItemDataArray = payload.menuItems;

		if (!Array.isArray(menuItemDataArray)) {
			throw new BadRequestException(
				"Request body should contain 'menuItems' array for bulk creation.",
			);
		}

		for (const menuItemData of menuItemDataArray) {
			const menuItem = new MenuItem();
			menuItem.restaurant_id = restaurant_id;
			menuItem.name = menuItemData.name;
			menuItem.description = menuItemData.description;
			menuItem.price = menuItemData.price;
			menuItem.image_url = menuItemData.image_url;
			menuItem.ingredients = menuItemData.ingredients;
			menuItem.is_available =
				menuItemData.is_available !== undefined
					? menuItemData.is_available
					: true;
			menuItem.display_order = menuItemData.display_order;

			menuItemsToInsert.push(menuItem);
		}

		const queryRunner =
			this.menuItemRepository.manager.connection.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		console.log('### menuItemsToInsert ###', menuItemsToInsert);

		try {
			await queryRunner.manager.insert(MenuItem, menuItemsToInsert);
			await queryRunner.commitTransaction();
			return menuItemsToInsert;
		} catch (dbError) {
			await queryRunner.rollbackTransaction();
			console.error(
				'Database error during bulk menu item insertion, transaction rolled back:',
				dbError,
			);
			throw new InternalServerErrorException('Something went wrong!');
		} finally {
			await queryRunner.release();
		}
	}
}

export default RestaurantService;
