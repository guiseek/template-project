import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { RoleType } from '../enums/role-type.enum';
import { UserAccount } from '../entities/user-account.entity';
import { PrimaryGeneratedColumn } from 'typeorm';
import { AbstractDto } from '@guiseek/core/api/common';

export class UserAccountDto extends AbstractDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelPropertyOptional()
  firstName?: string;

  @ApiModelPropertyOptional()
  lastName?: string;

  @ApiModelPropertyOptional()
  username: string;

  @ApiModelPropertyOptional({ enum: RoleType })
  role: RoleType = RoleType.User;

  @ApiModelPropertyOptional()
  email: string;

  @ApiModelPropertyOptional()
  avatar: string;

  @ApiModelPropertyOptional()
  phone: string;

  constructor(user: UserAccount) {
    super(user);
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user && user.role ? user.role : RoleType.User;
    this.email = user && user.email;
    this.avatar = user && user.avatar;
    this.phone = user.phone;
  }
}
