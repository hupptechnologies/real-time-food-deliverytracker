import { Role } from '../modules/role/entities/role.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultRolesSeed1740044123186 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const roleRepository = queryRunner.manager.getRepository(Role);

		const defaultRoles = [
			{ name: 'admin', description: 'Super administrator with full access' },
			{ name: 'user', description: 'Default user with basic platform access' },
			{ name: 'restaurant', description: 'Restaurant/Vendor role' },
			{ name: 'driver', description: 'Delivery driver role' },
		];

		for (const roleData of defaultRoles) {
			const existingRole = await roleRepository.findOne({
				where: { name: roleData.name },
			});
			if (!existingRole) {
				const role = roleRepository.create(roleData);
				await roleRepository.save(role);
				console.log(`Role "${roleData.name}" created.`);
			} else {
				console.log(`Role "${roleData.name}" already exists.`);
			}
		}
		console.log('Default roles seeding completed.');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const roleRepository = queryRunner.manager.getRepository(Role);
		const defaultRoleNames = ['admin', 'user', 'restaurant', 'driver'];

		for (const roleName of defaultRoleNames) {
			const roleToRemove = await roleRepository.findOne({
				where: { name: roleName },
			});
			if (roleToRemove) {
				await roleRepository.remove(roleToRemove);
				console.log(`Role "${roleName}" removed.`);
			}
		}
		console.log('Default roles seeding rollback completed.');
	}
}
