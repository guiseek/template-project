import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { RoleType } from '../enums/role-type.enum';
import { UserAccount } from '../entities/user-account.entity';
import { PrimaryGeneratedColumn } from 'typeorm';

export class UserAccountDto {
  @PrimaryGeneratedColumn()
  id: string;

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
    // super(user);
    this.role = user && user.role ? user.role : RoleType.User;
    this.email = user && user.email;
    this.avatar = user && user.avatar;
    // this.phone = user.phone;
  }
}
