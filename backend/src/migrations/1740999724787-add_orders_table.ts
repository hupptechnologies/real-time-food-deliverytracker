import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddOrdersTable1740999724787 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'orders',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'restaurant_id',
						type: 'integer',
						isNullable: false,
					},
					{
						name: 'customer_id',
						type: 'integer',
						isNullable: false,
					},
					{
						name: 'driver_id',
						type: 'integer',
						isNullable: true,
					},
					{
						name: 'payment_id',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'status',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'eta',
						type: 'timestamp with time zone',
						isNullable: true,
					},
					{
						name: 'actual_delivery_time',
						type: 'timestamp with time zone',
						isNullable: true,
					},
					{
						name: 'order_number',
						type: 'varchar',
						isNullable: true,
						isUnique: true,
					},
					{
						name: 'address',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'order_total',
						type: 'decimal',
						precision: 10,
						scale: 2,
						isNullable: false,
						default: 0,
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
				indices: [{ columnNames: ['order_number'], isUnique: true }],
			}),
			true,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('orders', true);
	}
}
