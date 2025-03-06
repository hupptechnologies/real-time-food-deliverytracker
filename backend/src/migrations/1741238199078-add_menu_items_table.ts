import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export class AddMenuItemsTable1741238199078 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'menu_items',
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
						name: 'name',
						type: 'varchar',
						length: '255',
						isNullable: false,
					},
					{
						name: 'description',
						type: 'text',
						isNullable: true,
					},
					{
						name: 'price',
						type: 'decimal',
						precision: 10,
						scale: 2,
						isNullable: false,
					},
					{
						name: 'image_url',
						type: 'varchar',
						length: '255',
						isNullable: true,
					},
					{
						name: 'ingredients',
						type: 'text',
						isNullable: true,
					},
					{
						name: 'is_available',
						type: 'boolean',
						default: true,
						isNullable: false,
					},
					{
						name: 'display_order',
						type: 'integer',
						isNullable: true,
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
			'menu_items',
			new TableForeignKey({
				name: 'FK_menu_items_restaurant_id',
				columnNames: ['restaurant_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'restaurants',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey(
			'menu_items',
			'FK_menu_items_restaurant_id',
		);
		await queryRunner.dropTable('menu_items', true);
	}
}
