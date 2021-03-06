/* tslint:disable:quotemark object-literal-sort-keys */
import * as dotenv from 'dotenv';
// import { SnakeNamingStrategy } from './src/snake-naming.strategy';

if (!module.hot /* for webpack HMR */) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
}

dotenv.config({
  path: `.${process.env.NODE_ENV}.env`
});

// Replace \\n with \n to support multiline strings in AWS
for (const envName of Object.keys(process.env)) {
  process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
}

module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  // namingStrategy: new SnakeNamingStrategy(),
  entities: ['libs/**/*.entity{.ts,.js}']
  // migrations: ['src/migrations/*{.ts,.js}']
};
