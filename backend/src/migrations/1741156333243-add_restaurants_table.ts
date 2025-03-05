import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddRestaurantsTable1741156333243 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'restaurants',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'name',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'owner_id',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'address',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'is_active',
						type: 'boolean',
						default: false,
					},
					{
						name: 'created_at',
						type: 'timestamp with time zone',
						default: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'updated_at',
						type: 'timestamp with time zone',
						default: 'CURRENT_TIMESTAMP',
						onUpdate: 'CURRENT_TIMESTAMP',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('restaurants');
	}
}
