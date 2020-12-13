import { ConfigService } from '@nestjs/config';
import { FusionAuthClient } from '@fusionauth/typescript-client';
import type { TaskCallback } from '../../wrapAppContext';

export const deleteEmailTemplates: TaskCallback = async (app) => {
  const fusionAuthClient = app.get<FusionAuthClient>(FusionAuthClient);
  const configService = app.get<ConfigService>(ConfigService);

  const templates = [
    configService.get<string>('FUSIONAUTH_EMAIL_TEMPLATE_VERIFICATION_ID'),
  ];

  const templateRequests = templates.map(async (templateId) => {
    await fusionAuthClient.deleteEmailTemplate(templateId);
  });

  await Promise.all(templateRequests);

  console.log('OK');
};
