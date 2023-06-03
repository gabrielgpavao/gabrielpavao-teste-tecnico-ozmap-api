import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersEntity1685812078215 implements MigrationInterface {
	name = 'UsersEntity1685812078215';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(127) NOT NULL, "email" varchar(127) NOT NULL, "age" integer NOT NULL)');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE "users"');
	}
}
