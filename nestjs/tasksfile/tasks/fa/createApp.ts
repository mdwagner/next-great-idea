import { FusionAuthClient } from '@fusionauth/typescript-client';
import { ConfigService } from '@nestjs/config';
import type { TaskCallback } from '../../wrapAppContext';

export const createApp: TaskCallback = async (app) => {
  const fusionAuthClient = app.get<FusionAuthClient>(FusionAuthClient);
  const configService = app.get<ConfigService>(ConfigService);

  const appId = configService.get<string>('FUSIONAUTH_APP_ID');
  const appName = configService.get<string>('APP_NAME');
  const previousTenantId = fusionAuthClient.tenantId;
  fusionAuthClient.tenantId = configService.get<string>('FUSIONAUTH_TENANT_ID');

  await fusionAuthClient.createApplication(appId, {
    application: {
      name: appName,
      roles: [
        {
          name: 'admin',
          isDefault: false,
          isSuperRole: true,
        },
        {
          name: 'user',
          isDefault: true,
          isSuperRole: false,
        },
      ],
    },
  });
  fusionAuthClient.tenantId = previousTenantId;

  console.log('OK');
};
