import { Global, Module, HttpModule } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from './services/config.service';

const providers = [
  ConfigService
]

@Global()
@Module({
  providers,
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [CoreApiCommonModule],
      useFactory: (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET_KEY')
      }),
      inject: [ConfigService]
    })
  ],
  exports: [...providers, HttpModule, JwtModule],
})
export class CoreApiCommonModule {}
