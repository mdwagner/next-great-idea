import { FusionAuthClient } from '@fusionauth/typescript-client';
import type { TaskCallback } from '../../wrapAppContext';

export const checkStatus: TaskCallback = async (app) => {
  const fusionAuthClient = app.get<FusionAuthClient>(FusionAuthClient);

  await fusionAuthClient.clientBuilder
    .build(fusionAuthClient.host)
    .withAuthorization(fusionAuthClient.apiKey)
    .withUri('/api/status')
    .withMethod('GET')
    .go();

  console.log('OK');
};
