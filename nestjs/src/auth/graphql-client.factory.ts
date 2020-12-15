import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLClient } from 'graphql-request';

export const factory: FactoryProvider<GraphQLClient> = {
  provide: GraphQLClient,
  useFactory: (configService: ConfigService) => {
    const endpoint = configService.get<string>('HASURA_GRAPHQL_ENDPOINT');
    const adminSecret = configService.get<string>(
      'HASURA_GRAPHQL_ADMIN_SECRET',
    );

    return new GraphQLClient(`${endpoint}/v1/graphql`, {
      headers: {
        'x-hasura-admin-secret': adminSecret,
      },
    });
  },
  inject: [ConfigService],
};
