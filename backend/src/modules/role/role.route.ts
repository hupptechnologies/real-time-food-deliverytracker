import express from 'express';
import RolesService from './role.service';
import RolesController from './role.controller';
import authenticateMiddleware from '../../middlewares/authenticate.middleware';
import { Roles } from '../../constants/roles';

const router = express();
const rolesService = new RolesService();
const rolesController = new RolesController(rolesService);

router.use(authenticateMiddleware([Roles.ADMIN]));

router.post('/', rolesController.create.bind(rolesController));
router.get('/', rolesController.findAll.bind(rolesController));
router.get('/:id', rolesController.findOne.bind(rolesController));
router.put('/:id', rolesController.update.bind(rolesController));
router.delete('/:id', rolesController.remove.bind(rolesController));

export default router;
