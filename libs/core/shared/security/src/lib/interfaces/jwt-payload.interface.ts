import { UserAccount } from './user-account.interface';

export interface JwtPayload {
  token: {
    accessToken: string;
    expiresIn: number;
  };
  user: UserAccount;
}
