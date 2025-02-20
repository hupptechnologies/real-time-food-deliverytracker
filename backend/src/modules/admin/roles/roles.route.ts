import express from 'express';
import RolesService from './roles.service';
import RolesController from './roles.controller';

const router = express();
const rolesService = new RolesService();
const rolesController = new RolesController(rolesService);

router.post('/', rolesController.create.bind(rolesController));
router.get('/', rolesController.getAll.bind(rolesController));
router.get('/:id', rolesController.getOne.bind(rolesController));
router.put('/:id', rolesController.update.bind(rolesController));
router.delete('/:id', rolesController.remove.bind(rolesController));

export default router;
