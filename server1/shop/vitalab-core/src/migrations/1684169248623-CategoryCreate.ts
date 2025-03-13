import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CategoryCreate1684169248623 implements MigrationInterface {
  name = "CategoryCreate1684169248623";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "vitalab_category" DROP COLUMN "created_at"`);
    // await queryRunner.query(`ALTER TABLE "vitalab_category" DROP COLUMN "updated_at"`);
    // await queryRunner.query(`ALTER TABLE "vitalab_category" ALTER COLUMN "code" SET NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "vitalab_category" ALTER COLUMN "slug" SET NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "vitalab_category" ADD CONSTRAINT "UQ_f1ad3089b332888819288d17906" UNIQUE ("slug")`);
    // await queryRunner.query(`ALTER TABLE "vitalab_category" ALTER COLUMN "parent_id" SET NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "vitalab_category" ALTER COLUMN "order" SET NOT NULL`);
    await queryRunner.createTable(
      new Table({
        name: "vitalab_category",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "255",
          },
          {
            name: "code",
            type: "varchar",
            length: "255",
          },
          {
            name: "slug",
            type: "varchar",
            length: "255",
          },
          {
            name: "parent_id",
            type: "varchar",
            length: "255",
          },
          {
            name: "order",
            type: "integer",
          },
          // Add more columns if needed
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vitalab_category" ALTER COLUMN "order" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "vitalab_category" ALTER COLUMN "parent_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "vitalab_category" DROP CONSTRAINT "UQ_f1ad3089b332888819288d17906"`
    );
    await queryRunner.query(
      `ALTER TABLE "vitalab_category" ALTER COLUMN "slug" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "vitalab_category" ALTER COLUMN "code" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "vitalab_category" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "vitalab_category" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
  }
}
