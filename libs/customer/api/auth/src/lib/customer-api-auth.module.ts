import { Module, NestModule, DynamicModule } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class CustomerApiAuth implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: CustomerApiAuth,
      providers: [AuthService]
    };
  }
  public configure() {}
}
