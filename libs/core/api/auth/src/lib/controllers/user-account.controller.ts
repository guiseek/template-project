import { UserAccountService } from '../services/user-account.service';
import { ApiUseTags, ApiOkResponse, ApiBearerAuth, ApiImplicitFile } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  UseGuards,
  Param,
  Put,
  UnauthorizedException,
  BadRequestException,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from '../services/auth.service';
import { UserAccountDto } from '../dtos/user-account.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserAccount } from '../decorators/auth-user-account.decorator';
import { UserAccount } from '../entities/user-account.entity';
import { RoleType } from '../enums/role-type.enum';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { FileUpload } from '@guiseek/core/api/common';

@Controller('user-account')
@ApiUseTags('user-account')
export class UserAccountController {
  constructor(
    public readonly userService: UserAccountService,
    public readonly authService: AuthService
  ) { }

  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse({
  //   type: LoginPayloadDto,
  //   description: 'User info with access token'
  // })
  // async userLogin(
  //   @Body() userLoginDto: UserLoginDto
  // ): Promise<LoginPayloadDto> {
  //   const userEntity = await this.authService.validateUser(userLoginDto);
  //   console.log(userEntity);
  //   const token = await this.authService.createToken(userEntity);
  //   const userAccount = new UserAccountDto(userEntity);
  //   const dto = new LoginPayloadDto(userAccount, token);
  //   return dto;
  //   // return new LoginPayloadDto(userEntity.toDto(), token);
  // }

  @Post('me/avatar')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserAccountDto, description: 'Successfully Updated' })
  @ApiImplicitFile({ name: 'avatar', required: true })
  @UseInterceptors(FileInterceptor('avatar'))
  async userAvatar(
    // @Body() userRegisterDto: UserRegisterDto,
    @AuthUserAccount() user: UserAccount,
    @UploadedFile() file: FileUpload,
  ): Promise<any> {
    console.log(file.size, user);

    try {
      const upload =  await this.userService.changeAvatar(
        user, file
      )
      return upload;
    } catch (err) {
      throw new BadRequestException(err)
    }

    // const createdUser = await this.userService.createUser(
    //   userRegisterDto,
    //   file,
    // );

    // return createdUser.toDto();
  }

  @Put('me/update')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({
    type: UserAccountDto,
    description: 'Successfully Updated'
  })
  // @ApiImplicitFile({ name: 'avatar', required: true })
  // @UseInterceptors(FileInterceptor('avatar'))
  async userRegister(
    @AuthUserAccount() user: UserAccount,
    @Body() dto: UserAccount
  ): Promise<UserAccountDto> {

    if (user.role === RoleType.User && user.id === dto.id) {
      try {
        const updatedUser = await this.userService.update(dto);
        return new UserAccountDto(updatedUser);
      } catch (err) {
        throw new BadRequestException(err.message, err);
      }
    } else {
      throw new UnauthorizedException('Usuários não podem alterar dados de outros usuários.');
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // @UseInterceptors(AuthUserInterceptor)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserAccountDto, description: 'current user info' })
  getCurrentUser() {
    return this.userService.find()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(AuthUserInterceptor)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserAccountDto, description: 'current user info' })
  getUserAccount(@Param('id') id: number) {
    return this.userService.findOne({ id: id })
  }
}
