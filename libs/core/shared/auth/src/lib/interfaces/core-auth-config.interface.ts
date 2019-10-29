import { JwtConfig } from './jwt-config.interface';

export interface CoreAuthConfig {
  endpoint?: string;
  redirect?: {
    success: string;
    failure: string;
  };
  title?: string;
  jwtConfig?: JwtConfig;
}
