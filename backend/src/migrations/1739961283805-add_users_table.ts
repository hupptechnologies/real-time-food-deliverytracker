import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddUsersTable1739961283805 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{ name: 'email', type: 'varchar', isUnique: true, isNullable: false },
					{ name: 'password', type: 'varchar' },
					{ name: 'name', type: 'varchar', isNullable: false },
					{
						name: 'createdAt',
						type: 'timestamp with time zone',
						default: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'updatedAt',
						type: 'timestamp with time zone',
						default: 'CURRENT_TIMESTAMP',
						onUpdate: 'CURRENT_TIMESTAMP',
					},
				],
				indices: [{ columnNames: ['email'], isUnique: true }],
			}),
			true,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users', true);
	}
}
