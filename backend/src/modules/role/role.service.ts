import { In } from 'typeorm';
import { AppDataSource } from '../../config/database.config';
import NotFoundException from '../../exceptions/not-found.exception';
import BadRequestException from '../../exceptions/bad-request.exception';
import { Role } from './entities/role.entity';

class RolesService {
	private roleRepository = AppDataSource.getRepository(Role);

	public async create(roleData: any): Promise<Role> {
		const existingRole = await this.roleRepository.findOne({
			where: { name: roleData.name },
		});
		if (existingRole) {
			throw new BadRequestException(
				'Role with this name already exists',
				'DuplicateRoleName',
			);
		}

		const role = new Role();
		role.name = roleData.name;
		role.description = roleData.description;

		const savedRole = await this.roleRepository.save(role);
		return savedRole;
	}

	public async findAll(): Promise<Role[]> {
		return this.roleRepository.find();
	}

	public async findOne(roleId: number): Promise<Role> {
		const role = await this.roleRepository.findOneBy({ id: roleId });
		if (!role) {
			throw new NotFoundException(
				`Role with ID ${roleId} not found`,
				'RoleNotFound',
			);
		}
		return role;
	}

	public async update(roleId: number, roleData: any): Promise<Role> {
		const role = await this.findOne(roleId);
		Object.assign(role, roleData);

		const updatedRole = await this.roleRepository.save(role);
		return updatedRole;
	}

	public async delete(roleId: number): Promise<void> {
		const role = await this.findOne(roleId);
		await this.roleRepository.remove(role);
	}

	public async findRoleByName(roleName: string): Promise<Role | null> {
		const role = await this.roleRepository.findOne({
			where: { name: roleName },
		});
		return role;
	}

	public async findRolesByIds(roleIds: number[]): Promise<Role[]> {
		if (!roleIds || !Array.isArray(roleIds) || roleIds.length === 0) {
			return [];
		}
		const roles = await this.roleRepository.find({
			where: {
				id: In(roleIds),
			},
		});
		return roles;
	}
}

export default RolesService;
