import { UserAccountService } from '../services/user-account.service';
import { ApiUseTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get
} from '@nestjs/common';
import { LoginPayloadDto } from '../dtos/login-payload.dto';
import { UserLoginDto } from '../dtos/user-login.dto';
import { AuthService } from '../services/auth.service';
import { UserAccountDto } from '../dtos/user-account.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { RoleType } from '../enums/role-type.enum';

@Controller('user-account')
@ApiUseTags('user-account')
export class UserAccountController {
  constructor(
    public readonly userService: UserAccountService,
    public readonly authService: AuthService
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token'
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto
  ): Promise<LoginPayloadDto> {
    const userEntity = await this.authService.validateUser(userLoginDto);
    console.log(userEntity);
    const token = await this.authService.createToken(userEntity);
    const userAccount = new UserAccountDto(userEntity);
    const dto = new LoginPayloadDto(userAccount, token);
    return dto;
    // return new LoginPayloadDto(userEntity.toDto(), token);
  }
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserAccountDto,
    description: 'Successfully Registered'
  })
  // @ApiImplicitFile({ name: 'avatar', required: true })
  // @UseInterceptors(FileInterceptor('avatar'))
  async userRegister(
    @Body() userRegisterDto: UserRegisterDto
    // @UploadedFile() file: IFile,
  ): Promise<UserAccountDto> {
    const createdUser = await this.userService.createUser(
      userRegisterDto
      // file,
    );
    console.log(createdUser);
    return plainToClass(
      UserAccountDto,
      new UserAccountDto(Object.assign({ role: RoleType.User }, createdUser))
    );
    // return createdUser.toDto();
  }

  // @Get('me')
  // @HttpCode(HttpStatus.OK)
  // // @UseGuards(AuthGuard)
  // // @UseInterceptors(AuthUserInterceptor)
  // @ApiBearerAuth()
  // @ApiOkResponse({ type: UserAccountDto, description: 'current user info' })
  // getCurrentUser(@AuthUser() user: UserEntity) {
  //   return user.toDto();
  // }
}
