import express from 'express';
import AuthController from './auth.controller';
import AuthService from './auth.service';

const router = express.Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

export default router;
