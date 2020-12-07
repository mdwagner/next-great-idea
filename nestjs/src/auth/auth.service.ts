import { Injectable, HttpService } from '@nestjs/common';
import { FusionAuthService } from './fusion-auth.service';
import { FusionAuthLoginResponse } from './models/fusion-auth-login-response.model';
import { FusionAuthSignUpResponse } from './models/fusion-auth-sign-up-response.model';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private fusionAuthService: FusionAuthService,
  ) {}

  async login(
    loginId: string,
    password: string,
  ): Promise<FusionAuthLoginResponse> {
    const { response } = await this.fusionAuthService.client.login({
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
  ): Promise<FusionAuthSignUpResponse> {
    return {
      success: true,
    };
  }
}
