import express from 'express';
import roleRoutes from './roles/roles.route';
import authenticateMiddleware from '../../middlewares/authenticate.middleware';
import { Roles } from '../../constants/roles';

const router = express();

router.use(authenticateMiddleware([Roles.ADMIN]));

router.use('/roles', roleRoutes);

export default router;
