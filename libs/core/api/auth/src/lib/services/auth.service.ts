import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
  ForbiddenException,
  UnauthorizedException
} from '@nestjs/common';
import { UserAccountDto } from '../dtos/user-account.dto';
import { UserAccount } from '../entities/user-account.entity';
import { TokenPayloadDto } from '../dtos/token.payload.dto';
import { UserAccountService } from './user-account.service';
import { UserLoginDto } from '../dtos/user-login.dto';
import {
  ContextService,
  ConfigService,
  UtilsService
} from '@guiseek/core/api/common';

@Injectable()
export class AuthService {
  private static _authUserKey = 'user';

  static setAuthUser(user: UserAccount) {
    ContextService.set(AuthService._authUserKey, user);
  }

  static getAuthUser(): UserAccount {
    return ContextService.get(AuthService._authUserKey);
  }

  constructor(
    public readonly jwtService: JwtService,
    @Inject(forwardRef(() => ConfigService))
    private readonly configService: ConfigService,
    public readonly userService: UserAccountService
  ) {}

  async createToken(
    user: UserAccount | UserAccountDto
  ): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.getNumber('JWT_EXPIRATION_TIME'),
      // expiresIn: 3600,
      accessToken: await this.jwtService.signAsync({ id: user.id })
    });
  }

  async findUser(dto: UserLoginDto) {
    return await this.userService.findByUsernameOrEmail(dto);
  }
  async validateUser(userLoginDto: UserLoginDto): Promise<UserAccount> {
    const user = await this.userService.findByUsernameOrEmail(userLoginDto);
    const isPasswordValid = await UtilsService.validateHash(
      userLoginDto.password,
      user && user.password
    );
    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    return user;
  }
}
