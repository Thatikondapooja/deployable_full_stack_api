import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToUserEntity1764237273657 implements MigrationInterface {
    name = 'AddColumnToUserEntity1764237273657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
    }

}
