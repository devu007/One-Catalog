declare module '@kinde-oss/kinde-nodejs-sdk' {
    export interface KindeClientOptions {
      domain: string;
      clientId: string;
      clientSecret: string;
      redirectUri: string;
      logoutRedirectUri: string;
      grantType: string;
    }
  
    export class KindeClient {
      constructor(options: KindeClientOptions);
    }
  
    export const GrantType: {
      PKCE: string;
    };
  }
  