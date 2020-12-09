import type { TaskCallback } from '../../wrapAppContext';
import { GraphQLClient, gql } from 'graphql-request';
import { ConfigService } from '@nestjs/config';
import { FusionAuthClient } from '@fusionauth/typescript-client';

export const deleteTenant: TaskCallback = async (app) => {
  const graphqlClient = app.get<GraphQLClient>(GraphQLClient);
  const configService = app.get<ConfigService>(ConfigService);
  const fusionAuthClient = app.get<FusionAuthClient>(FusionAuthClient);

  if (configService.get<string>('NODE_ENV') === 'production') {
    throw new Error('Cannot delete tenant in production!');
  }

  const tenantId = configService.get<string>('FUSIONAUTH_TENANT_ID');
  await fusionAuthClient.deleteTenant(tenantId);

  await graphqlClient.request(gql`
    mutation FusionAuthDeleteTenantTask {
      delete_users(where: {}) {
        affected_rows
      }
      delete_ideas(where: {}) {
        affected_rows
      }
    }
  `);
};
