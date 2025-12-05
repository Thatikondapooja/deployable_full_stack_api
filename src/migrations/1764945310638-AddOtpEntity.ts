import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOtpEntity1764945310638 implements MigrationInterface {
    name = 'AddOtpEntity1764945310638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otps" ("id" SERIAL NOT NULL, "otpHash" character varying NOT NULL, "expiresAt" bigint NOT NULL, "attempts" integer NOT NULL DEFAULT '0', "issuedCount" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" integer, CONSTRAINT "PK_91fef5ed60605b854a2115d2410" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "otps" ADD CONSTRAINT "FK_0474513ecfcf0084a232ee555ed" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otps" DROP CONSTRAINT "FK_0474513ecfcf0084a232ee555ed"`);
        await queryRunner.query(`DROP TABLE "otps"`);
    }

}//npm run migration:generate -- src/migrations/AddOtpEntity
