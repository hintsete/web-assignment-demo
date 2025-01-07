import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTBLMenuItem1736236586159 implements MigrationInterface {
    name = 'AddTBLMenuItem1736236586159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."menu_item_categories_enum" AS ENUM('Noodles', 'Rice', 'Common Dishes', 'Drinks', 'Special Salad', 'Sizzling')`);
        await queryRunner.query(`CREATE TABLE "menu_item" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "image_url" character varying NOT NULL, "categories" "public"."menu_item_categories_enum" array NOT NULL, CONSTRAINT "PK_722c4de0accbbfafc77947a8556" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "menu_item"`);
        await queryRunner.query(`DROP TYPE "public"."menu_item_categories_enum"`);
    }

}
