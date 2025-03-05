import express from 'express';
import authenticateMiddleware from '../../middlewares/authenticate.middleware';
import { Roles } from '../../constants/roles';
import RestaurantService from './restaurant.service';
import RestaurantController from './restaurant.controller';

const router = express.Router();
const restaurantService = new RestaurantService();
const restaurantController = new RestaurantController(restaurantService);

router.post(
	'/register',
	authenticateMiddleware([Roles.USER]),
	restaurantController.register.bind(restaurantController),
);

router.use(authenticateMiddleware([Roles.RESTAURANT]));
router.post('/menu');
router.get('/menu');
router.put('/menu');
router.delete('/menu');

router.post('/orders/:id');
router.get('/orders');
router.get('/orders/current');

export default router;
