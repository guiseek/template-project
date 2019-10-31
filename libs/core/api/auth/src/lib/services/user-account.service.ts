import { Injectable, BadRequestException } from '@nestjs/common';
import { UserAccountRepository } from '../repositories/user-account.repository';
import { FindConditions } from 'typeorm';
import { UserAccount } from '../entities/user-account.entity';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { UtilsService, AwsS3Service, FileUpload } from '@guiseek/core/api/common';
import { UserAccountDto } from '../dtos/user-account.dto';

@Injectable()
export class UserAccountService {
  constructor(
    private readonly repository: UserAccountRepository,
    private readonly awsS3Service: AwsS3Service
  ) {}
  findOne(findData: FindConditions<UserAccount>): Promise<UserAccount> {
    return this.repository.findOne(findData);
  }
  async changeAvatar(user: UserAccount, file: FileUpload) {
    let avatar: string;
    if (file && !UtilsService.isImage(file.mimetype)) {
      throw new BadRequestException('error.file.not_image');
      // throw new BadRequestException('O arquivo enviado não é uma imagem');
    }

    if (file) {
      avatar = await this.awsS3Service.uploadImage(file);
    }
    // user.avatar = avatar;
    // user = this.userRepository.create({ ...userRegisterDto, avatar });

    return this.repository.save({
      ...user, avatar
    });
  }
  async findByUsernameOrEmail(
    options: Partial<{ username: string; email: string }>
  ): Promise<UserAccount | undefined> {
    const queryBuilder = this.repository.createQueryBuilder('user');

    if (options.email) {
      queryBuilder.orWhere('user.email = :email', {
        email: options.email
      });
    }
    if (options.username) {
      queryBuilder.orWhere('user.username = :username', {
        username: options.username
      });
    }

    return queryBuilder.getOne();
  }

  async createUser(
    dto: UserRegisterDto
    // file: IFile,
  ): Promise<UserAccount> {
    // let avatar: string;
    // if (file && !this.validatorService.isImage(file.mimetype)) {
    //   throw new FileNotImageException();
    // }

    // if (file) {
    //   avatar = await this.awsS3Service.uploadImage(file);
    // }
    const user = this.repository.create({
      ...dto,
      password: UtilsService.generateHash(dto.password)
    });

    return this.repository.save(user);
  }
  async update(dto: UserAccountDto) {
    return await this.repository.save(dto);
  }
  async find() {
    return this.repository.find()
  }
  async findAll(pageOptionsDto) {
    const queryBuilder = this.repository.createQueryBuilder('user');
    return await queryBuilder
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)
      .getManyAndCount();
  }
  // async getUsers(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
  //   const queryBuilder = this.repository.createQueryBuilder('user');
  //   const [users, usersCount] = await queryBuilder
  //     .skip(pageOptionsDto.skip)
  //     .take(pageOptionsDto.take)
  //     .getManyAndCount();

  //   const pageMetaDto = new PageMetaDto({
  //     pageOptionsDto,
  //     itemCount: usersCount,
  //   });
  //   return new UsersPageDto(users.toDtos(), pageMetaDto);
  // }
}
