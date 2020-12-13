import type { TaskCallback } from '../../wrapAppContext';
import { checkStatus } from './checkStatus';
import { createTenant } from './createTenant';
import { createApp } from './createApp';
import { seedUsers } from './seedUsers';

export const genesis: TaskCallback = async (app) => {
  await checkStatus(app);
  await createTenant(app);
  await createApp(app);
  await seedUsers(app);
};
