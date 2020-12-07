import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FusionAuthClient } from '@fusionauth/typescript-client';

export const factory: FactoryProvider<FusionAuthClient> = {
  provide: FusionAuthClient,
  useFactory: (configService: ConfigService) => {
    return new FusionAuthClient(
      configService.get('FUSIONAUTH_API_KEY'),
      configService.get('FUSIONAUTH_URL'),
      configService.get('FUSIONAUTH_TENANT_ID'),
    );
  },
  inject: [ConfigService],
};
