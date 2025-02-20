import { AppDataSource } from '../../config/database.config';
import { User } from './entites/user.entity';
import { Role } from '../admin/entities/role.entity';
import { UserRole } from './entites/user_role.entity';
import InternalServerErrorException from '../../exceptions/internal-server-error.exception';
import RolesService from '../admin/roles/roles.service';

class UserService {
	private userRepository = AppDataSource.getRepository(User);
	private userRoleRepository = AppDataSource.getRepository(UserRole);
	private roleService: RolesService;

	constructor(roleService: RolesService) {
		this.roleService = roleService;
	}

	public async create(userData: any): Promise<any> {
		const { roles, ...restUserData } = userData;

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

	public async findByEmail(email: string): Promise<User | null> {
		const user = await this.userRepository.findOne({ where: { email } });
		return user;
	}

	public async findUserById(id: number): Promise<User | null> {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ['roles'],
		});
		return user;
	}
}

export default UserService;
