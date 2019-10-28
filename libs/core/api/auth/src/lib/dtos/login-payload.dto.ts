'use strict';

import { TokenPayloadDto } from './token.payload.dto';
// import { UserAccountDto } from '../../user/dto/UserAccountDto';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserAccountDto } from './user-account.dto';

export class LoginPayloadDto {
  @ApiModelProperty({ type: UserAccountDto })
  user: UserAccountDto;
  @ApiModelProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(user: UserAccountDto, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}
