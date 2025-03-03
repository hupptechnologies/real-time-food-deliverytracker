import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRoleFkUsersTable1740395399655 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'users',
			new TableForeignKey({
				name: 'FK_users_roles',
				columnNames: ['role_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'roles',
				onDelete: 'RESTRICT',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('users', 'FK_users_roles');
	}
}
