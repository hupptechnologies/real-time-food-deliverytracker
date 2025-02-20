import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTimestampColumnNames1740045247833
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.renameColumn('users', 'createdAt', 'created_at');
		await queryRunner.renameColumn('users', 'updatedAt', 'updated_at');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.renameColumn('users', 'created_at', 'createdAt');
		await queryRunner.renameColumn('users', 'updated_at', 'updatedAt');
	}
}
