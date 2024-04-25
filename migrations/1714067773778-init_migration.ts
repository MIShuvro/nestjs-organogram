import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1714067773778 implements MigrationInterface {
    name = 'InitMigration1714067773778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`employees\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`designation_id\` int NOT NULL, \`parentId\` int NULL, INDEX \`IDX_2de5d6e4fb3345f18bc467017f\` (\`designation_id\`), INDEX \`IDX_015ce1d5cad9e0481f875ea26b\` (\`parentId\`), UNIQUE INDEX \`IDX_765bc1ac8967533a04c74a9f6a\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`designations\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`identifier\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_b31491e9f679b042b68a364b84\` (\`identifier\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sessions\` (\`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`subscriber\` int NOT NULL, \`token\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employees_closure\` (\`id_ancestor\` int NOT NULL, \`id_descendant\` int NOT NULL, INDEX \`IDX_2b54dc48f0ea1b42893a90881a\` (\`id_ancestor\`), INDEX \`IDX_bea19392864abbedc2cc717225\` (\`id_descendant\`), PRIMARY KEY (\`id_ancestor\`, \`id_descendant\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_2de5d6e4fb3345f18bc467017f0\` FOREIGN KEY (\`designation_id\`) REFERENCES \`designations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD CONSTRAINT \`FK_015ce1d5cad9e0481f875ea26bf\` FOREIGN KEY (\`parentId\`) REFERENCES \`employees\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employees_closure\` ADD CONSTRAINT \`FK_2b54dc48f0ea1b42893a90881a3\` FOREIGN KEY (\`id_ancestor\`) REFERENCES \`employees\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employees_closure\` ADD CONSTRAINT \`FK_bea19392864abbedc2cc7172251\` FOREIGN KEY (\`id_descendant\`) REFERENCES \`employees\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employees_closure\` DROP FOREIGN KEY \`FK_bea19392864abbedc2cc7172251\``);
        await queryRunner.query(`ALTER TABLE \`employees_closure\` DROP FOREIGN KEY \`FK_2b54dc48f0ea1b42893a90881a3\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_015ce1d5cad9e0481f875ea26bf\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP FOREIGN KEY \`FK_2de5d6e4fb3345f18bc467017f0\``);
        await queryRunner.query(`DROP INDEX \`IDX_bea19392864abbedc2cc717225\` ON \`employees_closure\``);
        await queryRunner.query(`DROP INDEX \`IDX_2b54dc48f0ea1b42893a90881a\` ON \`employees_closure\``);
        await queryRunner.query(`DROP TABLE \`employees_closure\``);
        await queryRunner.query(`DROP TABLE \`sessions\``);
        await queryRunner.query(`DROP INDEX \`IDX_b31491e9f679b042b68a364b84\` ON \`designations\``);
        await queryRunner.query(`DROP TABLE \`designations\``);
        await queryRunner.query(`DROP INDEX \`IDX_765bc1ac8967533a04c74a9f6a\` ON \`employees\``);
        await queryRunner.query(`DROP INDEX \`IDX_015ce1d5cad9e0481f875ea26b\` ON \`employees\``);
        await queryRunner.query(`DROP INDEX \`IDX_2de5d6e4fb3345f18bc467017f\` ON \`employees\``);
        await queryRunner.query(`DROP TABLE \`employees\``);
    }

}
