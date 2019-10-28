import { UserAccount } from './user-account.interface';

export interface JwtPayload {
  token: string;
  user: UserAccount;
}
