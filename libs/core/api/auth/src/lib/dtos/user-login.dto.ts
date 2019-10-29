'use strict';

import { IsString, IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ValidateIf(o => !o.email)
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly username: string;

  @ValidateIf(o => !o.username)
  @IsString()
  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @ApiModelProperty()
  readonly password: string;
}
