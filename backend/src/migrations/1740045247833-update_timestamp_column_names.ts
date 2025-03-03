import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTimestampColumnNames1740045247833
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.renameColumn('users', 'createdAt', 'created_at');
		await queryRunner.renameColumn('users', 'updatedAt', 'updated_at');
		await queryRunner.renameColumn('roles', 'createdAt', 'created_at');
		await queryRunner.renameColumn('roles', 'updatedAt', 'updated_at');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.renameColumn('users', 'created_at', 'createdAt');
		await queryRunner.renameColumn('users', 'updated_at', 'updatedAt');
		await queryRunner.renameColumn('roles', 'created_at', 'createdAt');
		await queryRunner.renameColumn('roles', 'updated_at', 'updatedAt');
	}
}
