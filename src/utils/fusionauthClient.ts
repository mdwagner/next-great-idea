import { FusionAuthClient } from '@fusionauth/typescript-client';

const clientApiKey = 'Bn1bHtL29JZiTyLJTxF2IRoGOsm8KzvC2je7JZXQv3I';
const url = 'https://fusionauth.wagz.dev';

export const client = new FusionAuthClient(clientApiKey, url);
