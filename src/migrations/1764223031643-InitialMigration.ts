import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1764223031643 implements MigrationInterface {
    name = 'InitialMigration1764223031643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cards" ("cardId" SERIAL NOT NULL, "listId" integer, "cardName" character varying, CONSTRAINT "PK_9146498428f5650af7e841d3866" PRIMARY KEY ("cardId"))`);
        await queryRunner.query(`CREATE TABLE "lists" ("listId" SERIAL NOT NULL, "listName" character varying, "projectId" integer, CONSTRAINT "PK_07493c67087623b314685887c31" PRIMARY KEY ("listId"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("project_id" SERIAL NOT NULL, "project_name" character varying NOT NULL, "description" text, "start_date" date, "target_end_date" date, "project_category" character varying, "team_members" text array, CONSTRAINT "PK_b3613537a59b41f5811258edf99" PRIMARY KEY ("project_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "refreshToken" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, CONSTRAINT "UQ_367aad98203bd8afaed0d704093" UNIQUE ("role"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userUserId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_b38bd5c220511055a802bbce985" PRIMARY KEY ("userUserId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0bd606ba8531dd93b457b8486d" ON "user_roles_role" ("userUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_8e71fba12a609e08cf311fde6d9" FOREIGN KEY ("listId") REFERENCES "lists"("listId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_567492c279b63c1e9a43f7385df" FOREIGN KEY ("projectId") REFERENCES "projects"("project_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_0bd606ba8531dd93b457b8486d9" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_0bd606ba8531dd93b457b8486d9"`);
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_567492c279b63c1e9a43f7385df"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_8e71fba12a609e08cf311fde6d9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0bd606ba8531dd93b457b8486d"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "lists"`);
        await queryRunner.query(`DROP TABLE "cards"`);
    }

}
