import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { UserAccountController } from './controllers/user-account.controller';
import { UserAccount } from './entities/user-account.entity';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserAccountService } from './services/user-account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAccount]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [AuthService, JwtStrategy, UserAccountService],
  controllers: [AuthController, UserAccountController],
  exports: [AuthService]
})
export class CoreApiAuthModule {}
