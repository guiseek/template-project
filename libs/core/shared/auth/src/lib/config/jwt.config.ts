import { JwtConfig } from '../interfaces/jwt-config.interface';

export const CORE_JWT_CONFIG: JwtConfig = {
  withoutTokenUrls: ['auth/'],
  headerName: 'Authorization',
  headerPrefix: 'JWT',
  tokenName: 'token',
  storageKeyName: 'token'
};
export const CORE_JWT_CONFIG_TOKEN = 'JwtConfig';
