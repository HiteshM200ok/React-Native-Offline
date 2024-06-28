export interface IAppConfig {
  apiBaseUrl: string;
}

export interface IAppStageAppConfig {
  development: IAppConfig;
  staging: IAppConfig;
  production: IAppConfig;
}
