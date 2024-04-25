import { DataSource } from 'typeorm';

console.log(' process.env.ENV_PATH ', process.env.ENV_PATH);
require('dotenv').config({
  path: process.env.ENV_PATH
});
console.log('driver ', process.env.DB_DRIVER);

const dataSource = new DataSource({
  type: process.env.DB_DRIVER as any,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: process.env.RUN_MIGRATION === 'true',
  replication: {
    master: {
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    slaves: [
      {
        host: process.env.DB_READ_HOST ?? process.env.DB_HOST,
        port: +process.env.DB_READ_PORT ?? +process.env.DB_PORT,
        username: process.env.DB_READ_USER ?? process.env.DB_USER,
        password: process.env.DB_READ_PASSWORD ?? process.env.DB_PASSWORD,
        database: process.env.DB_READ_NAME ?? process.env.DB_NAME
      }
    ]
  },
  logging: process.env.DB_LOG_ENABLED === 'true',
  migrations: ['dist/migrations/*.js'],
  timezone: 'Z',
  extra: {
    connectionLimit: 5
  }
});
export default dataSource;
