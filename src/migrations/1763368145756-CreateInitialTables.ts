import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1763368145756 implements MigrationInterface {
    name = 'CreateInitialTables1763368145756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lists" ("list_id" SERIAL NOT NULL, "project_id" integer NOT NULL, "list_name" character varying NOT NULL, CONSTRAINT "PK_c4d20f4dbfb0cfac750907f70ae" PRIMARY KEY ("list_id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("card_id" SERIAL NOT NULL, "list_id" integer NOT NULL, "card_name" character varying NOT NULL, CONSTRAINT "PK_0feb2239f0c3b16c38cb62129c7" PRIMARY KEY ("card_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "lists"`);
    }

}
