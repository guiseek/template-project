import {
  Module,
  forwardRef,
  NestModule,
  MiddlewareConsumer
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerApiAuth } from '@guiseek/customer/api/auth';
import {
  CoreApiCommonModule,
  ConfigService,
  contextMiddleware
} from '@guiseek/core/api/common';
import { CoreApiAuthModule, AUTH_ENTITIES } from '@guiseek/core/api/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // CoreApiAuthModule,
    forwardRef(() => CoreApiAuthModule),
    CustomerApiAuth.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [CoreApiCommonModule],
      useFactory: (configService: ConfigService) =>
        configService.getTypeOrmConfig(AUTH_ENTITIES),
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
  }
}
