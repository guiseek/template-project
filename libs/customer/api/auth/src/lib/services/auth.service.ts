import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  login(data) {
    const current_date = (new Date()).valueOf().toString();
    const random = Math.random().toString();

    return {
      user: data,
      token: createHash('sha1').update(current_date + random).digest('hex')
    }
  }
}
