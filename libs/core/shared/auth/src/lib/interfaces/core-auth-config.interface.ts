export interface CoreAuthConfig {
  endpoint: string;
  redirect: {
    success: string;
    failure: string;
  }
  title?: string;
}
