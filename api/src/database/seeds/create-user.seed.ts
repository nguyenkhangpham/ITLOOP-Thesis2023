import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../entities/user.entity';
import { hashSync } from 'bcrypt';

export class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const commonPw = await hashSync('12345678', 10);
    const userData = [
      {
        id: 1,
        email: 'doctor@gmail.com',
        fullName: 'Doctor',
        password: commonPw,
        roleId: 1,
      },
      {
        id: 2,
        email: 'patient@gmail.com',
        fullName: 'Patient',
        password: commonPw,
        roleId: 2,
      },
    ];

    for (const data of userData) {
      const userExists = await userRepository.findOneBy({
        email: data.email,
      });

      if (!userExists) {
        await userRepository.save(data);
      }
    }
  }
}
