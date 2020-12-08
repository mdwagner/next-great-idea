import * as yup from 'yup';

export const validationSchema = yup.object({
  NODE_ENV: yup.string().oneOf(['development', 'production', 'test']).default('development'),
  PORT: yup.number().default(3000),
  FUSIONAUTH_URL: yup.string().default('http://fusionauth:9011'),
  FUSIONAUTH_API_KEY: yup.string().default('bf69486b-4733-4470-a592-f1bfce7af580'),
  FUSIONAUTH_TENANT_ID: yup.string().default('ec02c5c8-d4ef-440e-b5ff-5f3b4fe51b48'),
  FUSIONAUTH_APP_ID: yup.string().default('85a03867-dccf-4882-adde-1a79aeec50df'),
  FUSIONAUTH_THEME_ID: yup.string().default('d2c5b616-cdb7-4abb-97cc-4465a29f313f'),
  FUSIONAUTH_JWT_KEY_ID: yup.string().default('29c14b28-fe3a-4db5-a49c-3fd30b5e4bce'),
  FUSIONAUTH_EMAIL_TEMPLATE_VERIFICATION_ID: yup.string().default('6e046c92-5a42-4d21-8bb8-8e76eba035c7'),
  HASURA_GRAPHQL_ENDPOINT: yup.string().default('http://hasura:8080'),
  HASURA_GRAPHQL_ADMIN_SECRET: yup.string().default('secret'),
  EMAIL_HOST: yup.string().default('mailhog'),
  EMAIL_PORT: yup.string().default('1025'),
  EMAIL_FROM_EMAIL: yup.string().default('no-reply@fusionauth.io'),
  EMAIL_FROM_NAME: yup.string().default('NextGreatIdea App'),
  APP_ISSUER: yup.string().default('http://example.com'),
  APP_NAME: yup.string().default('NextGreatIdea'),
  JWT_KID: yup.string().default('QTccbJfA2iI8rNHwUGYWdiNgrN-ueQOK'),
  JWT_SECRET: yup.string().default('secret'),
})
