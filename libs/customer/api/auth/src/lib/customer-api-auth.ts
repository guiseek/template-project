import { Module, NestModule, DynamicModule } from "@nestjs/common";

@Module({ })
export class CustomerApiAuth implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: CustomerApiAuth,
      providers: []
    }
  }
  public configure() {

  }
}
