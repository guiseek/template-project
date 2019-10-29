import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private usersService: UsersService) { }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();

    console.log(req && req.user);

    return req.user;
    // console.log('req: ', req[USER_REQUEST_KEY]);

    // req[USER_REQUEST_KEY] = await this.usersService.findOne(1);

    // return true;
  }
}
// import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

// export const AuthGuard = NestAuthGuard('jwt');
