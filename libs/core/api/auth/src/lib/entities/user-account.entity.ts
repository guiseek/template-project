import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RoleType } from '../enums/role-type.enum';
import { UserAccountDto } from '../dtos/user-account.dto';
import { AbstractEntity } from '@guiseek/core/api/common';

@Entity({ name: 'user_account' })
export class UserAccount extends AbstractEntity<UserAccountDto> {
  // @PrimaryGeneratedColumn()
  // id: number;
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

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
    length: '64',
    nullable: false
  })
  username: string;

  @Column({
    type: 'varchar',
    length: '6128',
    nullable: false
  })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  dtoClass = UserAccountDto;
}
