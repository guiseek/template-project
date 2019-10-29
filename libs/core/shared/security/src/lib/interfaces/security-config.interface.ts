export interface CoreSecurityConfig {
  api: {
    prefix?: string;
    login: string;
    signup?: string;
  };
  auth: {
    login: {
      path: string;
      redirect?: {
        success?: string;
        failure?: string;
      }
    }
    signup: {
      path: string;
      redirect?: {
        success?: string;
        failure?: string;
      }
    }
  }
}
