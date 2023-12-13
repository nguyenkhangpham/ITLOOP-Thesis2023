import dotenv from 'dotenv';
import { ConfigApp } from './type';

dotenv.config();

const config: ConfigApp = {
  environment: process.env?.NODE_ENV ?? 'development',
  host: process.env?.HOST ?? '0.0.0.0',
  port: Number(process.env?.PORT ?? 8080),
  prefix: process.env?.PREFIX ?? 'api',
  jwtAuth: {
    jwtAccessTtl: process.env?.JWT_ACCESS_TTL ?? '30d',
    jwtRefreshTtl: process.env?.JWT_REFRESH_TTL ?? '60d',
    jwtTokenSecret: process.env?.JWT_TOKEN_SECRET ?? '',
  },
};

export default config;
