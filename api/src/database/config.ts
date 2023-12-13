import { AppDataSource } from '../../typeorm.config';
import Logger from '@helpers/logger';

const logger = Logger();
const Database = {
  connect: async () => {
    try {
      await AppDataSource.initialize();
      logger.info('Database has been initialized!');
    } catch (error) {
      logger.error('Error during Database initialization: ' + error);
    }
  },
};

export default Database;
