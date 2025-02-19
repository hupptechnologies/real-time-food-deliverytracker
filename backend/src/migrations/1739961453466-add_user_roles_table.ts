import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class AddUserRolesTable1739961453466 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users_roles',
				columns: [
					{ name: 'user_id', type: 'integer', isPrimary: true },
					{ name: 'role_id', type: 'integer', isPrimary: true },
					{
						name: 'assigned_at',
						type: 'timestamp with time zone',
						default: 'CURRENT_TIMESTAMP',
					},
				],
			}),
			true,
		);
		await queryRunner.createForeignKey(
			'users_roles',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);

		await queryRunner.createForeignKey(
			'users_roles',
			new TableForeignKey({
				columnNames: ['role_id'],
				referencedTableName: 'roles',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users_roles', true);
	}
}
