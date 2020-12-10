import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { envSchemaValidation } from './config/env-schema-validation';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) =>
        envSchemaValidation.validateSync(config, {
          abortEarly: true,
          stripUnknown: true,
        }),
      envFilePath: [
        '.env.production.local',
        '.env.production',
        '.env.development.local',
        '.env.development',
      ],
      cache: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    AuthModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
