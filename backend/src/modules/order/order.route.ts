import express from 'express';
import { Roles } from '../../constants/roles';
import authenticateMiddleware from '../../middlewares/authenticate.middleware';
import OrderService from './order.service';
import OrderController from './order.controller';

const router = express.Router();
const orderService = new OrderService();
const orderController = new OrderController(orderService);

router.use(authenticateMiddleware([Roles.USER]));

router.post('/', orderController.create.bind(orderController));
router.get('/history', orderController.findAll.bind(orderController));
router.get('/:id', orderController.findOne.bind(orderController));
router.put('/:id/cancel', orderController.update.bind(orderController));
export default router;
