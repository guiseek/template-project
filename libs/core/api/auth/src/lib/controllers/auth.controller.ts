import { UserAccountService } from '../services/user-account.service';
import { ApiUseTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  UseGuards,
  UseInterceptors,
  ConflictException
} from '@nestjs/common';
import { LoginPayloadDto } from '../dtos/login-payload.dto';
import { UserLoginDto } from '../dtos/user-login.dto';
import { AuthService } from '../services/auth.service';
import { UserAccountDto } from '../dtos/user-account.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { RoleType } from '../enums/role-type.enum';
// import { AuthGuard } from '../guards/auth.guard';
import { AuthUserInterceptor } from '../interceptors/auth-user-account.interceptor';
import { UserAccount } from '../entities/user-account.entity';
import { AuthUserAccount } from '../decorators/auth-user-account.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiUseTags('auth')
// @UseInterceptors(AuthUserInterceptor)
export class AuthController {
  constructor(
    public readonly userService: UserAccountService,
    public readonly authService: AuthService
  ) { }

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
    const token = await this.authService.createToken(userEntity);
    return new LoginPayloadDto(userEntity.toDto(), token);
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
    @Body() dto: UserRegisterDto
    // @UploadedFile() file: IFile,
  ): Promise<UserAccountDto> {
    const user = await this.authService.findUser(dto);
    console.log(user);
    if (!!user) {
      throw new ConflictException('Credenciais em uso.');
    }
    const createdUser = await this.userService.createUser(
      dto
      // file,
    );
    return createdUser.toDto();
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(AuthUserInterceptor)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserAccountDto, description: 'current user info' })
  getCurrentUser(@AuthUserAccount() { password, ...user }: UserAccount) {
    return user;
  }
}
