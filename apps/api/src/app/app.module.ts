import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerApiAuth } from '@guiseek/customer/api/auth';
import { CoreApiCommonModule, ConfigService } from '@guiseek/core/api/common';
import { CoreApiAuhModule } from '@guiseek/core/api/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CoreApiAuhModule,
    CustomerApiAuth.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [CoreApiCommonModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
