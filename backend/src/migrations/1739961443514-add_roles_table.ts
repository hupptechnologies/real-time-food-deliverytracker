import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddRolesTable1739961443514 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'roles',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{ name: 'name', type: 'varchar', isUnique: true },
					{ name: 'description', type: 'text', isNullable: true },
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
				indices: [{ columnNames: ['name'], isUnique: true }],
			}),
			true,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('roles', true);
	}
}
