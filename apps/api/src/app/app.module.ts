import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerApiAuth } from '@guiseek/customer/api/auth';
@Module({
  imports: [CustomerApiAuth.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
