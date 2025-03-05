import express from 'express';
import authenticateMiddleware from '../../middlewares/authenticate.middleware';
import { Roles } from '../../constants/roles';

const router = express.Router();

router.use(authenticateMiddleware([Roles.RESTAURANT]));

router.post('/menu');
router.get('/menu');
router.put('/menu');
router.delete('/menu');

router.post('/orders/:id');
router.get('/orders');
router.get('/orders/current');
