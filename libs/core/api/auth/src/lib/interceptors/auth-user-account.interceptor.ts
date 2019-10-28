import { Observable } from 'rxjs';
import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { UserAccount } from '../entities/user-account.entity';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (!!request) {

      const user = <UserAccount>request && request.user;
      console.log('user: ', user)
      AuthService.setAuthUser(user);
    }

    return next.handle();
  }
}
