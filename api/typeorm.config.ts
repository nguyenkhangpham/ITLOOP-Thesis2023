import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { config } from 'dotenv';
import { MainSeeder } from './src/database/seeds/main-seed';

config();

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env?.MYSQL_HOST ?? 'localhost',
  port: Number(process.env?.MYSQL_PORT ?? 3306),
  username: process.env?.MYSQL_USERNAME ?? '',
  password: process.env?.MYSQL_PASSWORD ?? '',
  database: process.env?.MYSQL_DATABASE_NAME ?? '',
  logging: Boolean(process.env?.MYSQL_LOG) ?? false,
  entities: ['src/database/entities/*{.ts, .js}'],
  migrations: ['src/database/migrations/*.ts'],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
