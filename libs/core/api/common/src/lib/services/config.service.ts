import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AwsConfigInterface } from '../interfaces/aws-config.interface';
// import { snakeCase } from 'typeorm/util/StringUtils';

export class ConfigService {
  constructor() {
    const nodeEnv = this.nodeEnv;
    dotenv.config({
      path: `.${nodeEnv}.env`
    });

    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }

  getTypeOrmConfig(entities?): TypeOrmModuleOptions {
    // let entities = [__dirname + '/../../../**/*.entity{.ts,.js}'];
    // let migrations = [__dirname + '/../../migrations/*{.ts,.js}'];
    // const entities = [UserAccount]

    /**
     * @reference `module.hot` https://docs.nestjs.com/techniques/hot-reload#hot-module-replacement
     */
    if ((<any>module).hot) {
      const entityContext = (<any>require).context(
        // './../../modules',
        './../../..',
        true,
        /\.entity\.ts$/
      );
      // entities = entityContext.keys().map(id => {
      //   const entityModule = entityContext(id);
      //   const [entity] = Object.values(entityModule);
      //   return entity;
      // });
      const migrationContext = (<any>require).context(
        './../../migrations',
        false,
        /\.ts$/
      );
      // migrations = migrationContext.keys().map(id => {
      //   const migrationModule = migrationContext(id);
      //   const [migration] = Object.values(migrationModule);
      //   return migration;
      // });
    }
    return {
      entities,
      // migrations,
      keepConnectionAlive: true,
      type: 'mysql',
      host: this.get('MYSQL_HOST'),
      port: this.getNumber('MYSQL_PORT'),
      username: this.get('MYSQL_USERNAME'),
      password: this.get('MYSQL_PASSWORD'),
      database: this.get('MYSQL_DATABASE'),
      // synchronize: true,
      // migrationsRun: true,
      logging: this.nodeEnv === 'development'
      // namingStrategy: new SnakeNamingStrategy(),
    };
  }

  get awsS3Config(): AwsConfigInterface {
    return {
      accessKeyId: this.get('AWS_S3_ACCESS_KEY_ID'),
      secretAccessKey: this.get('AWS_S3_SECRET_ACCESS_KEY'),
      bucketName: this.get('S3_BUCKET_NAME'),
    };
  }
}
