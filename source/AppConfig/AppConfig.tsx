import {IAppConfig, IAppStageAppConfig} from './AppConfig.d';
/**
 * Application stages
 * Apply one of the stage amongst AppStages
 */
type AppStages = 'development' | 'staging' | 'production';
export const EnableAppStage: AppStages = 'development';

// development app-config
const DevepomentAppConfig: IAppConfig = {
  apiBaseUrl:
    'https://1ebe-2405-201-2003-7023-851d-e5bc-2a8f-7fc7.ngrok-free.app/',
};

// staging app-config
const StagingAppConfig: IAppConfig = {
  apiBaseUrl:
    'https://1ebe-2405-201-2003-7023-851d-e5bc-2a8f-7fc7.ngrok-free.app/',
};

// production app-config
const ProductionAppConfig: IAppConfig = {
  apiBaseUrl:
    'https://1ebe-2405-201-2003-7023-851d-e5bc-2a8f-7fc7.ngrok-free.app/',
};

// app configs
const AppConfig: IAppStageAppConfig = {
  development: DevepomentAppConfig,
  staging: StagingAppConfig,
  production: ProductionAppConfig,
};

export const getAppConfig = (): IAppConfig => {
  return AppConfig[EnableAppStage];
};

export const getApiBaseUrl = (): string => {
  return getAppConfig().apiBaseUrl;
};
