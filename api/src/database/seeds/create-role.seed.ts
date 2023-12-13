import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from '../entities/role.entity';

export class RoleSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);
    const roleData = [
      {
        id: 1,
        name: 'DOCTOR',
      },
      {
        id: 2,
        name: 'PATIENT',
      },
    ];

    for (const data of roleData) {
      const role = await roleRepository.findOneBy({ id: data.id });
      if (!role) {
        await roleRepository.save(data);
      }
    }
  }
}
