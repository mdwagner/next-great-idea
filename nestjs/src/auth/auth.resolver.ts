import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { FusionAuthLoginResponse } from './models/fusion-auth-login-response.model';
import { FusionAuthSignUpResponse } from './models/fusion-auth-sign-up-response.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => FusionAuthLoginResponse)
  async login(
    @Args('loginId') loginId: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(loginId, password);
  }

  @Mutation(() => FusionAuthSignUpResponse)
  async signUp(
    @Args('email') email: string,
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.signUp(email, username, password);
  }
}
