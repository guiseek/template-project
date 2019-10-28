import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/user-account.controller';
import { UserAccount } from './entities/user-account.entity';
import { UserAccountService } from './services/user-account.service';
import { AuthService } from './services/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccount])],
  providers: [UserAccountService, AuthService],
  controllers: [AuthController],
  exports: [UserAccountService, AuthService]
})
export class CoreApiAuhModule {}
