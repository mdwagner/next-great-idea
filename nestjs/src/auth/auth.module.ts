import { Module, HttpModule } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { FusionAuthService } from './fusion-auth.service';

@Module({
  imports: [HttpModule],
  providers: [AuthResolver, AuthService, FusionAuthService],
  exports: [FusionAuthService],
})
export class AuthModule {}
