import { NextFunction, Request, Response } from 'express';
import UsersService from './user.service';
import { ApiResponse } from '../../utils/response';
import { HttpStatus } from '../../constants/http-status';
import NotFoundException from '../../exceptions/not-found.exception';

class UserController {
	private usersService: UsersService;

	constructor(usersService: UsersService) {
		this.usersService = usersService;
	}

	public async create(req: Request, res: Response, next: NextFunction) {
		try {
			const body = req.body;
			const newUser = await this.usersService.create(body);
			ApiResponse(res, HttpStatus.CREATED, true, 'New user added!', newUser);
		} catch (error: any) {
			next(error);
		}
	}

	public async findOne(req: Request, res: Response, next: NextFunction) {
		try {
			const { id: userId } = req.params;
			const user = await this.usersService.findUserById(parseInt(userId, 10));
			if (!user) {
				return next(new NotFoundException('User not found!'));
			}

			ApiResponse(
				res,
				HttpStatus.OK,
				true,
				'User details fetched successfully!',
				user,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async findAll(_req: Request, res: Response, next: NextFunction) {
		try {
			const users = await this.usersService.findAll();
			ApiResponse(
				res,
				HttpStatus.OK,
				true,
				'Users fetched successfully!',
				users,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async update(req: Request, res: Response, next: NextFunction) {
		try {
			const body = req.body;
			const { id: userId } = req.params;
			const updatedUser = await this.usersService.update(
				parseInt(userId, 10),
				body,
			);
			ApiResponse(
				res,
				HttpStatus.OK,
				true,
				'User details updated!',
				updatedUser,
			);
		} catch (error: any) {
			next(error);
		}
	}

	public async remove(req: Request, res: Response, next: NextFunction) {
		try {
			const { id: userId } = req.params;
			await this.usersService.remove(parseInt(userId, 10));
			ApiResponse(res, HttpStatus.OK, true, 'User deleted!');
		} catch (error: any) {
			next(error);
		}
	}
}

export default UserController;
