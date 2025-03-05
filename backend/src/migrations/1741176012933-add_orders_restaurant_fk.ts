import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddOrdersRestaurantFk1741176012933 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			'orders',
			new TableForeignKey({
				name: 'FK_orders_restaurant',
				columnNames: ['restaurant_id'],
				referencedTableName: 'restaurants',
				referencedColumnNames: ['id'],
				onDelete: 'NO ACTION',
				onUpdate: 'NO ACTION',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('orders', 'FK_orders_restaurant');
	}
}
