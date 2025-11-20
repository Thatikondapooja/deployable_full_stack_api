import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailToUser1763572140875 implements MigrationInterface {
    name = 'AddEmailToUser1763572140875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    }

}
// npm run migration:generate src/migrations/AddEmailToUser to generate migration  in place of AddEmailToUser we can write what we change.