import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class AddOrderHistoryTable1741072011581 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'order_history',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'order_id',
						type: 'uuid',
						isNullable: false,
					},
					{
						name: 'status',
						type: 'varchar',
						isNullable: false,
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
			true,
		);
		await queryRunner.createForeignKey(
			'order_history',
			new TableForeignKey({
				name: 'FK_order_history_order_id',
				columnNames: ['order_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'orders',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(
			'order_history',
			'FK_order_history_order_id',
		);

		await queryRunner.dropTable('order_history', true);
	}
}
