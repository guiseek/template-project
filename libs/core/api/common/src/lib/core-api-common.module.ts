import { Global, Module, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from './services/config.service';
import { ContextService } from './services/context.service';
import { AwsS3Service } from './services/aws-s3/aws-s3.service';

const providers = [ConfigService, ContextService, AwsS3Service];

@Global()
@Module({
  providers,
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [CoreApiCommonModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY')
      }),
      inject: [ConfigService]
    })
  ],
  exports: [...providers, HttpModule, JwtModule],
})
export class CoreApiCommonModule {}
