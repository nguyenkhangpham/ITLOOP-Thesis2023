import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1701337521418 implements MigrationInterface {
    name = 'InitDatabase1701337521418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(24) NOT NULL, INDEX \`ROLE_PK1\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role_id\` int NOT NULL, \`email\` varchar(200) NOT NULL, \`password\` varchar(100) NOT NULL, \`full_name\` varchar(200) NULL, \`avatar\` varchar(100) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`USER_UNIQUE1\` (\`email\`), INDEX \`USER_FK1\` (\`role_id\`), INDEX \`USER_PK1\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medicine\` (\`id\` int NOT NULL AUTO_INCREMENT, \`Medicine_name\` varchar(50) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, INDEX \`MEDICINE_PK1\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`medical_history_id\` int NOT NULL, \`medicine_id\` int NOT NULL, \`user_manual\` varchar(200) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, INDEX \`ORDER_FK2\` (\`medicine_id\`), INDEX \`ORDER_FK1\` (\`medical_history_id\`), INDEX \`ORDER_PK1\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medical_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`patient_id\` int NOT NULL, \`diagnose\` varchar(200) NULL, \`pulse\` float NOT NULL DEFAULT '00.00', \`blood_glucose\` float NOT NULL DEFAULT '00.00', \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, INDEX \`MEDICAL_HISTORY_FK1\` (\`patient_id\`), INDEX \`MEDICAL_HISTORY_PK1\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_db439f41369110014a7c0e1f5bf\` FOREIGN KEY (\`medical_history_id\`) REFERENCES \`medical_history\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_c84aaa8ff61da8a986bdbcfa492\` FOREIGN KEY (\`medicine_id\`) REFERENCES \`medicine\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`medical_history\` ADD CONSTRAINT \`FK_83285d6666f520246b9bd410833\` FOREIGN KEY (\`patient_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`medical_history\` DROP FOREIGN KEY \`FK_83285d6666f520246b9bd410833\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_c84aaa8ff61da8a986bdbcfa492\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_db439f41369110014a7c0e1f5bf\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`DROP INDEX \`MEDICAL_HISTORY_PK1\` ON \`medical_history\``);
        await queryRunner.query(`DROP INDEX \`MEDICAL_HISTORY_FK1\` ON \`medical_history\``);
        await queryRunner.query(`DROP TABLE \`medical_history\``);
        await queryRunner.query(`DROP INDEX \`ORDER_PK1\` ON \`order\``);
        await queryRunner.query(`DROP INDEX \`ORDER_FK1\` ON \`order\``);
        await queryRunner.query(`DROP INDEX \`ORDER_FK2\` ON \`order\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP INDEX \`MEDICINE_PK1\` ON \`medicine\``);
        await queryRunner.query(`DROP TABLE \`medicine\``);
        await queryRunner.query(`DROP INDEX \`USER_PK1\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`USER_FK1\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`USER_UNIQUE1\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`ROLE_PK1\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
