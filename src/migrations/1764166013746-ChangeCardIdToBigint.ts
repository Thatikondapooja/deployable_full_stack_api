import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCardIdToBigint1764166013746 implements MigrationInterface {
    name = 'ChangeCardIdToBigint1764166013746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "PK_9146498428f5650af7e841d3866"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "cardId"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "cardId" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "PK_9146498428f5650af7e841d3866" PRIMARY KEY ("cardId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "PK_9146498428f5650af7e841d3866"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "cardId"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "cardId" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "PK_9146498428f5650af7e841d3866" PRIMARY KEY ("cardId")`);
    }

}
