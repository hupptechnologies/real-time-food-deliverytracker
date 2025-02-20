import { NextFunction, Request, Response } from 'express';
import RolesService from './roles.service';
import { ApiResponse } from '../../../utils/response';
import { HttpStatus } from '../../../constants/http-status';

class RolesController {
	private rolesService: RolesService;

	constructor(rolesService: RolesService) {
		this.rolesService = rolesService;
	}

	public async create(req: Request, res: Response, next: NextFunction) {
		try {
			const body = req.body;
			const newRole = await this.rolesService.createRole(body);
			ApiResponse(res, HttpStatus.CREATED, true, 'New Role added!', newRole);
		} catch (error: any) {
			next(error);
		}
	}

	public async update(req: Request, res: Response, next: NextFunction) {
		try {
			const body = req.body;
			const { id: roleId } = req.params;
			const updatedRole = await this.rolesService.updateRole(
				parseInt(roleId, 10),
				body,
			);
			ApiResponse(res, HttpStatus.OK, true, 'Role updated!', updatedRole);
		} catch (error: any) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		try {
			const { id: roleId } = req.params;
			const role = await this.rolesService.getRoleById(parseInt(roleId, 10));
			ApiResponse(
				res,
				HttpStatus.OK,
				true,
				'Role details fetched successfully!',
				role,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const roles = await this.rolesService.getAllRoles();
			ApiResponse(
				res,
				HttpStatus.OK,
				true,
				'Roles fetched successfully!',
				roles,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async remove(req: Request, res: Response, next: NextFunction) {
		try {
			const { id: roleId } = req.params;
			await this.rolesService.deleteRole(parseInt(roleId, 10));
			ApiResponse(res, HttpStatus.OK, true, 'Role deleted!');
		} catch (error: any) {
			next(error);
		}
	}
}

export default RolesController;
