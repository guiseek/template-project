export interface JwtConfig {
  apiUrl?: string;
  withoutTokenUrls?: string[];
  headerName?: string;
  headerPrefix?: string;
  tokenName?: string;
  storageKeyName?: string;
}
