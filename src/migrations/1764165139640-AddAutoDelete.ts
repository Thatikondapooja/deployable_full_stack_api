import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAutoDelete1764165139640 implements MigrationInterface {
    name = 'AddAutoDelete1764165139640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_8e71fba12a609e08cf311fde6d9"`);
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_567492c279b63c1e9a43f7385df"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_8e71fba12a609e08cf311fde6d9" FOREIGN KEY ("listId") REFERENCES "lists"("listId") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_567492c279b63c1e9a43f7385df" FOREIGN KEY ("projectId") REFERENCES "projects"("project_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_567492c279b63c1e9a43f7385df"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_8e71fba12a609e08cf311fde6d9"`);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_567492c279b63c1e9a43f7385df" FOREIGN KEY ("projectId") REFERENCES "projects"("project_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_8e71fba12a609e08cf311fde6d9" FOREIGN KEY ("listId") REFERENCES "lists"("listId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
