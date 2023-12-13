import { DataSource } from 'typeorm';
import { runSeeder, Seeder } from 'typeorm-extension';
import { UserSeeder } from './create-user.seed';
import { RoleSeeder } from './create-role.seed';
export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await runSeeder(dataSource, RoleSeeder);
    await runSeeder(dataSource, UserSeeder);
  }
}
