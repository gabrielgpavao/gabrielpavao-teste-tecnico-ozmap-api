import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraint1685814326946 implements MigrationInterface {
    name = 'AddUniqueConstraint1685814326946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(45) NOT NULL, "email" varchar(127) NOT NULL, "age" integer NOT NULL, CONSTRAINT "UQ_ba448c3693c89fd06c898e0acc6" UNIQUE ("name"), CONSTRAINT "UQ_75180bd8e62d624af9fa502f352" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "age") SELECT "id", "name", "email", "age" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(127) NOT NULL, "email" varchar(127) NOT NULL, "age" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "age") SELECT "id", "name", "email", "age" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
