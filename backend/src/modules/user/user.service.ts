import { AppDataSource } from '../../config/database.config';
import { User } from './entites/user.entity';
import { Role } from '../role/entities/role.entity';
import InternalServerErrorException from '../../exceptions/internal-server-error.exception';
import RolesService from '../role/role.service';
import NotFoundException from '../../exceptions/not-found.exception';
import BadRequestException from '../../exceptions/bad-request.exception';
import { userMessage } from '../../constants/messages';

class UserService {
	private userRepository = AppDataSource.getRepository(User);
	private roleService: RolesService;

	constructor(roleService: RolesService) {
		this.roleService = roleService;
	}

	public async create(userData: any): Promise<any> {
		const { role, ...restUserData } = userData;

		const existingUser = await this.findByEmail(restUserData.email);
		if (existingUser) {
			throw new BadRequestException(
				userMessage.DUPLICATE_EMAIL,
				'DuplicateUser',
			);
		}

		if (!restUserData.password) {
			const randomTempPassword = this.generatePassword();
			restUserData.password = randomTempPassword;
		}

		const user = new User();
		Object.assign(user, restUserData);

		let assignedRole: Role | null = null;

		if (role) {
			assignedRole = await this.roleService.findOne(Number(role));
			if (!assignedRole) {
				throw new BadRequestException(
					userMessage.INVALID_ROLE_ID,
					'InvalidRoleID',
				);
			}
		} else {
			const defaultUserRole = await this.roleService.findRoleByName('user');
			if (defaultUserRole) {
				assignedRole = defaultUserRole;
			} else {
				console.warn('Default "user" role not found in database.');
				throw new InternalServerErrorException(
					userMessage.DEFAULT_ROLE_NOT_FOUND,
				);
			}
		}

		user.role = assignedRole;
		const newUser = await this.userRepository.save(user);

		return {
			id: newUser.id,
			email: newUser.email,
			role: { id: newUser.role.id, name: newUser.role.name },
		};
	}

	public async findAll(): Promise<User[]> {
		const users = await this.userRepository.find({ relations: ['role'] });
		const response: User[] = users.map((user) => {
			return user;
		});
		return response;
	}

	public async findUserById(id: number): Promise<User | null> {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ['role'],
		});
		return user;
	}

	public async findByEmail(email: string): Promise<User | null> {
		const user = await this.userRepository.findOne({
			where: { email },
			relations: ['role'],
			select: [
				'id',
				'name',
				'email',
				'password',
				'created_at',
				'updated_at',
				'role',
			],
		});
		return user;
	}

	public async update(userId: number, userData: any): Promise<any> {
		const user = await this.findUserById(userId);

		if (!user) {
			throw new NotFoundException(userMessage.NOT_FOUND, 'UserNotFound');
		}

		delete userData.password;

		const { role, ...restUserData } = userData;
		Object.assign(user, restUserData);

		if (role) {
			if (role !== user.roleId) {
				const updatedRole = await this.roleService.findOne(Number(role));
				if (!updatedRole) {
					throw new BadRequestException(
						userMessage.INVALID_ROLE_ID,
						'InvalidRoleID',
					);
				}
				user.role = updatedRole;
			}
		}

		const updatedUser = await this.userRepository.save(user);

		return {
			id: updatedUser.id,
			email: updatedUser.email,
			...restUserData,
			role: { id: updatedUser.role.id, name: updatedUser.role.name },
		};
	}

	public async remove(userId: number): Promise<void> {
		const user = await this.findUserById(userId);

		if (!user) {
			throw new NotFoundException(userMessage.NOT_FOUND, 'UserNotFound');
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
