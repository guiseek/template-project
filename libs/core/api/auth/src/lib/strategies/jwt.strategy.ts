import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef
} from '@nestjs/common';
import { ConfigService } from '@guiseek/core/api/common';
import { UserAccountService } from '../services/user-account.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private readonly configService: ConfigService,
    public readonly userService: UserAccountService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET_KEY')
    });
  }

  async validate({ iat, exp, id: userId }) {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
