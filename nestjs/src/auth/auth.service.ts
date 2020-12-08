import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FusionAuthClient } from '@fusionauth/typescript-client';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from './auth.service.generated';
import { FusionAuthLoginResponse } from './models/fusion-auth-login-response.model';
import { FusionAuthSignUpResponse } from './models/fusion-auth-sign-up-response.model';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private configService: ConfigService,
    private fusionAuthClient: FusionAuthClient,
    private graphqlClient: GraphQLClient,
  ) {}

  async login(
    loginId: string,
    password: string,
  ): Promise<FusionAuthLoginResponse> {
    const applicationId = this.configService.get<string>('FUSIONAUTH_APP_ID');

    const { response } = await this.fusionAuthClient.login({
      applicationId,
      loginId,
      password,
    });

    return {
      email: response?.user?.email,
      id: response?.user?.id,
      username: response?.user?.username,
      token: response?.token,
    };
  }

  async signUp(
    email: string,
    username: string,
    password: string,
    { adminRole = false, verifyEmail = true }: SignUpOptions,
  ): Promise<FusionAuthSignUpResponse> {
    const applicationId = this.configService.get<string>('FUSIONAUTH_APP_ID');
    const roles = ['user'];
    if (adminRole) roles.push('admin');

    try {
      const { response } = await this.fusionAuthClient.register(null, {
        registration: {
          applicationId,
          roles,
        },
        user: {
          email,
          username,
          password,
        },
        skipRegistrationVerification: true,
        skipVerification: !verifyEmail,
      });

      const sdk = getSdk(this.graphqlClient);

      await sdk.CreateUser({
        external_user_id: response?.user?.id,
        email: response?.user?.email,
        username: response?.user?.username,
      });

      return { success: true };
    } catch (err) {
      if (err instanceof Error) {
        this.logger.error(err.message, err.stack);
      }

      return { success: false };
    }
  }
}

interface SignUpOptions {
  adminRole?: boolean;
  verifyEmail?: boolean;
}
