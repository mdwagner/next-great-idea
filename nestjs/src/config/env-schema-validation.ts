import * as yup from 'yup';

export const envSchemaValidation = yup.object({
  NODE_ENV: yup
    .string()
    .oneOf(['development', 'production', 'test'])
    .required(),
  PORT: yup.number().required(),
  FUSIONAUTH_URL: yup.string().required(),
  FUSIONAUTH_API_KEY: yup.string().required(),
  FUSIONAUTH_TENANT_ID: yup.string().required(),
  FUSIONAUTH_APP_ID: yup.string().required(),
  FUSIONAUTH_THEME_ID: yup.string().required(),
  FUSIONAUTH_JWT_KEY_ID: yup.string().required(),
  FUSIONAUTH_EMAIL_TEMPLATE_VERIFICATION_ID: yup.string().required(),
  HASURA_GRAPHQL_ENDPOINT: yup.string().required(),
  HASURA_GRAPHQL_ADMIN_SECRET: yup.string().required(),
  EMAIL_HOST: yup.string().required(),
  EMAIL_PORT: yup.string().required(),
  EMAIL_FROM_EMAIL: yup.string().required(),
  EMAIL_FROM_NAME: yup.string().required(),
  APP_ISSUER: yup.string().required(),
  APP_NAME: yup.string().required(),
  JWT_KID: yup.string().required(),
  JWT_SECRET: yup.string().required(),
});
