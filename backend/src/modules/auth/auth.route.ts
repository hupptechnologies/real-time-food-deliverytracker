import express from 'express';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import UserService from '../user/user.service';
import RolesService from '../role/role.service';
import validationMiddleware from '../../middlewares/validation.middleware';
import { AuthDto } from './dto/auth.dto';

const router = express.Router();
const rolesService = new RolesService();
const userService = new UserService(rolesService);
const authService = new AuthService(userService);
const authController = new AuthController(authService);

router.post(
	'/register',
	validationMiddleware(AuthDto),
	authController.register.bind(authController),
);
router.post(
	'/login',
	validationMiddleware(AuthDto),
	authController.login.bind(authController),
);

export default router;
