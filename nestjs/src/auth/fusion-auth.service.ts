import { Injectable } from '@nestjs/common';
import { FusionAuthClient } from '@fusionauth/typescript-client';

@Injectable()
export class FusionAuthService {
  client: FusionAuthClient;

  constructor() {
    this.client = new FusionAuthClient('apiKey', 'host');
  }
}
