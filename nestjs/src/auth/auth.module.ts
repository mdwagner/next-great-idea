import { Module, HttpModule } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { factory as fusionAuthClientFactory } from './fusion-auth-client.factory';

@Module({
  imports: [HttpModule],
  providers: [AuthResolver, AuthService, fusionAuthClientFactory],
  exports: [fusionAuthClientFactory],
})
export class AuthModule {}
