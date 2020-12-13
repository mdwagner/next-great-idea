import type { TaskCallback } from '../../wrapAppContext';
import { checkStatus } from './checkStatus';
import { createTenant } from './createTenant';
import { createApp } from './createApp';
import { seedUsers } from './seedUsers';
import ClientResponse from '@fusionauth/typescript-client/build/src/ClientResponse';

export const genesis: TaskCallback = async (app) => {
  try {
    await checkStatus(app);
    await createTenant(app);
    await createApp(app);
    await seedUsers(app);
  } catch (error) {
    if (error instanceof ClientResponse) {
      const clientResponse = error;
      console.error(`STATUS => ${clientResponse.statusCode}`);
      console.error(JSON.stringify(clientResponse.exception, null, 2));
      throw new Error('genesis');
    }
    throw error;
  }
};
