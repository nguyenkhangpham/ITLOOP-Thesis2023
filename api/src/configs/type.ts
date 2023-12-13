export interface jwtConfig {
  jwtAccessTtl: string;
  jwtRefreshTtl: string;
  jwtTokenSecret: string;
}
export interface ConfigApp {
  environment: string;
  host: string;
  port: number;
  prefix: string;
  jwtAuth: jwtConfig;
}
