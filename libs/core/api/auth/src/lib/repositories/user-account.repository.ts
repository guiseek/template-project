import { UserAccount } from '../entities/user-account.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserAccount)
export class UserAccountRepository extends Repository<UserAccount> {}
