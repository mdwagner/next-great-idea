/// <reference types="react-scripts" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_FUSIONAUTH_API_KEY: string;
      REACT_APP_FUSIONAUTH_URL: string;
      REACT_APP_FUSIONAUTH_TENANT?: string;
    }
  }
}

export {}
