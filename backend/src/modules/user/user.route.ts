import express from 'express';
import { Roles } from '../../constants/roles';
import authenticateMiddleware from '../../middlewares/authenticate.middleware';
import UserService from './user.service';
import RolesService from '../role/role.service';
import UserController from './user.controller';

const router = express.Router();
const roleService = new RolesService();
const userService = new UserService(roleService);
const userController = new UserController(userService);

router.use(authenticateMiddleware([Roles.ADMIN]));

router.post('/', userController.create.bind(userController));
router.get('/', userController.findAll.bind(userController));
router.get('/:id', userController.findOne.bind(userController));
router.put('/:id', userController.update.bind(userController));
router.delete('/:id', userController.remove.bind(userController));

export default router;
