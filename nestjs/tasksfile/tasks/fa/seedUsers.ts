import type { TaskCallback } from '../../wrapAppContext';
import { AuthService } from '../../../src/auth/auth.service';

export const seedUsers: TaskCallback = async (app) => {
  const authService = app.get<AuthService>(AuthService);

  const defaultPassword = 'Asdf123!';

  // ADMIN
  await authService.signUp(
    'mother.nature@example.com',
    'mother_nature',
    defaultPassword,
    {
      adminRole: true,
      skipVerification: true,
    },
  );

  // USERS
  await authService.signUp(
    'john.doe@example.com',
    'john_doe',
    defaultPassword,
    {
      skipVerification: true,
    },
  );
  await authService.signUp(
    'jane.doe@example.com',
    'jane_doe',
    defaultPassword,
    {
      skipVerification: true,
    },
  );

  console.log('OK');
};
