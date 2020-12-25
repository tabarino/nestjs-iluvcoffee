import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1608899700006 implements MigrationInterface {
    name = 'SchemaSync1608899700006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees" DROP COLUMN "description"`);
    }
}
