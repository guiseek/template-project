import { createParamDecorator } from '@nestjs/common';

export const AuthUserAccount = createParamDecorator((data: string, req) => {
  return data ? req.user && req.user[data] : req.user;
});
// export const AuthUserAccount = createParamDecorator((_data, request) => request.user);
