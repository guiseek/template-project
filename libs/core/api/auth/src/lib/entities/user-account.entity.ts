import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RoleType } from '../enums/role-type.enum';

@Entity({ name: 'user_account' })
export class UserAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.User })
  role: RoleType = undefined;

  @Column({
    type: 'varchar',
    length: '64',
    nullable: false
  })
  email: string;

  @Column({
    type: 'varchar',
    length: '6128',
    nullable: false
  })
  password: string;

  @Column({ nullable: true })
  avatar: string;
}
