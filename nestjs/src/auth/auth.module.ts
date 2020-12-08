import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { factory as fusionAuthClientFactory } from './fusion-auth-client.factory';
import { factory as graphqlClientFactory } from './graphql-client.factory';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    fusionAuthClientFactory,
    graphqlClientFactory,
  ],
  exports: [fusionAuthClientFactory, graphqlClientFactory],
})
export class AuthModule {}
