import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrfanatos1602793101683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //Realiza as alterações no banco
        await queryRunner.createTable(new Table({
            name: "orfanatos",
            columns: [
            {
                name: "id",
                type: "integer",
                unsigned: true,
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment"

            },
            {
                name: "name",
                type: "varchar",

            },
            {
                name: "latitude",
                type: "decimal",
                scale: 10,
                precision: 2,
            },
            {
                name: "longitude",
                type: "decimal",
                scale: 10,
                precision: 2,
            },
            {
                name: "about",
                type: "text",
            },
            {
                name: "instructions",
                type: "text",
            },
            {
                name: "open_on_weekends",
                type: "bollean",
                default: false,
            },
            {
                name: "opening_hours",
                type: "varchar",

            },
        ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //Desfazer o que foi feito no UP
        await queryRunner.dropTable('orfanatos');

    }

}
