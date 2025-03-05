import { AppDataSource } from '../../config/database.config';
import BadRequestException from '../../exceptions/bad-request.exception';
import { Restaurant } from './entities/restaurant.entity';

class RestaurantService {
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
}

export default RestaurantService;
