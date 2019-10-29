export interface CoreSecurityConfig {
  api: {
    prefix?: string;
    login: string;
    signup?: string;
    me?: string;
  };
  auth: {
    login: {
      path: string;
      redirectTo: string;
      redirect?: {
        success?: string;
        failure?: string;
      };
    };
    signup: {
      path: string;
      redirectTo: string;
      redirect?: {
        success?: string;
        failure?: string;
      };
    };
    logout: {
      redirectTo: string;
    };
  };
}
