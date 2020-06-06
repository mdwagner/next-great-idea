import { FusionAuthClient } from '@fusionauth/typescript-client';

const clientApiKey = process.env.REACT_APP_FUSIONAUTH_API_KEY;
const url = process.env.REACT_APP_FUSIONAUTH_URL;
const tenantId = process.env.REACT_APP_FUSIONAUTH_TENANT;

export const client = new FusionAuthClient(clientApiKey, url, tenantId);
