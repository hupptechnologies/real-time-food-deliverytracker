import { AppDataSource } from '../../config/database.config';
import { User } from './entites/user.entity';
import { Role } from '../role/entities/role.entity';
import { UserRole } from './entites/user_role.entity';
import InternalServerErrorException from '../../exceptions/internal-server-error.exception';
import RolesService from '../role/role.service';
import NotFoundException from '../../exceptions/not-found.exception';
import BadRequestException from '../../exceptions/bad-request.exception';

class UserService {
	private userRepository = AppDataSource.getRepository(User);
	private userRoleRepository = AppDataSource.getRepository(UserRole);
	private roleService: RolesService;

	constructor(roleService: RolesService) {
		this.roleService = roleService;
	}

	public async create(userData: any): Promise<any> {
		const { roles, ...restUserData } = userData;

		const existingUser = await this.findByEmail(restUserData.email);
		if (existingUser) {
			throw new BadRequestException(
				'An account with this email already exist',
				'DuplicateUser',
			);
		}

		if (!restUserData.password) {
			const randomTempPassword = this.generatePassword();
			restUserData.password = randomTempPassword;
		}

		const user = new User();
		Object.assign(user, restUserData);

		let savedUser: User;
		try {
			savedUser = await this.userRepository.save(user);
		} catch (error) {
			console.error('Database error while saving user:', error);
			throw new InternalServerErrorException(
				'Failed to create user due to a server error',
				'UserCreationError',
			);
		}

		let assignedRoles: Role[] = [];

		if (roles && Array.isArray(roles) && roles.length > 0) {
			assignedRoles = await this.roleService.findRolesByIds(roles);
		} else {
			const defaultUserRole = await this.roleService.findRoleByName('user');
			if (defaultUserRole) {
				assignedRoles = [defaultUserRole];
			} else {
				console.warn('Default "user" role not found in database.');
				throw new InternalServerErrorException('Failed to create the account');
			}
		}

		if (assignedRoles.length > 0) {
			try {
				for (const role of assignedRoles) {
					const userRole = new UserRole();
					userRole.user = savedUser;
					userRole.role = role;
					await this.userRoleRepository.save(userRole);
				}
			} catch (error) {
				console.error('Database error while assigning roles to user:', error);
				await this.userRepository.remove(savedUser);
				throw new InternalServerErrorException(
					'Failed to assign roles to user',
					'RoleAssignmentError',
				);
			}
		}

		return {
			id: savedUser.id,
			email: savedUser.email,
			roles: assignedRoles.map((role) => ({ id: role.id, name: role.name })),
		};
	}

	public async findAll(): Promise<User[]> {
		const users = await this.userRepository.find({ relations: ['roles'] });
		const response: User[] = users.map((user) => {
			return user;
		});
		return response;
	}

	public async findUserById(id: number): Promise<User | null> {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ['roles'],
		});
		return user;
	}

	public async findByEmail(email: string): Promise<User | null> {
		const user = await this.userRepository.findOne({
			where: { email },
			select: [
				'id',
				'name',
				'email',
				'password',
				'createdAt',
				'updatedAt',
				'roles',
			],
		});
		return user;
	}

	public async update(userId: number, userData: any): Promise<User> {
		const user = await this.findUserById(userId);

		if (!user) {
			throw new NotFoundException(
				`User not found with ${userId} ID`,
				'UserNotFound',
			);
		}

		const { roles, ...restUserData } = userData;
		Object.assign(user, restUserData);

		let savedUser: User;
		try {
			savedUser = await this.userRepository.save(user);
		} catch (error) {
			console.error('Database error while saving user:', error);
			throw new InternalServerErrorException(
				'Failed to create user due to a server error',
				'UserCreationError',
			);
		}

		if (roles && Array.isArray(roles) && roles.length > 0) {
			const existingRoles = user.roles || [];

			const rolesToAdd = roles?.filter(
				(role: Role) =>
					!existingRoles.some((existingRole) => existingRole.id === role.id),
			);

			const rolesToRemove = existingRoles.filter(
				(existingRole) =>
					!roles.some(
						(requestedRole: Role) => requestedRole.id === existingRole.id,
					),
			);

			if (rolesToRemove.length > 0) {
				try {
					await this.userRoleRepository.delete(
						rolesToRemove.map((role) => ({
							user: { id: userId },
							role: { id: role.id },
						})) as any,
					);
				} catch (error) {
					console.error('Database error while removing user roles:', error);
				}
			}

			if (rolesToAdd.length > 0) {
				try {
					const userRolesToInsert = rolesToAdd.map((role: Role) => {
						const userRole = new UserRole();
						userRole.user = savedUser;
						userRole.role = role;
						return userRole;
					});
					await this.userRoleRepository.save(userRolesToInsert);
				} catch (error) {
					console.error('Database error while adding user roles:', error);
				}
			}
			const updatedUser = await this.findUserById(userId);

			Object.assign(savedUser, updatedUser);
		}

		return savedUser;
	}

	public async remove(userId: number): Promise<void> {
		const user = await this.findUserById(userId);

		if (!user) {
			throw new NotFoundException(
				`User not found with ${userId} ID`,
				'UserNotFound',
			);
		}

		await this.userRepository.remove(user);
	}

	private generatePassword(length = 12): string {
		const chars = {
			u: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			l: 'abcdefghijklmnopqrstuvwxyz',
			n: '0123456789',
			s: '!@#$%^&*()-_=+[]{}|;:,.<>?',
		};

		let password = Object.values(chars)
			.map((set) => set[(Math.random() * set.length) | 0])
			.join('');
		const allChars = Object.values(chars).join('');

		while (password.length < length) {
			password += allChars[(Math.random() * allChars.length) | 0];
		}

		return password
			.split('')
			.sort(() => Math.random() - 0.5)
			.join('');
	}
}

export default UserService;
