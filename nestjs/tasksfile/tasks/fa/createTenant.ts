import {
  FusionAuthClient,
  KeyAlgorithm,
  KeyType,
  SecureGeneratorType,
  ExpiryUnit,
  RefreshTokenExpirationPolicy,
  RefreshTokenUsagePolicy,
} from '@fusionauth/typescript-client';
import { ConfigService } from '@nestjs/config';
import { createEmailTemplates } from './createEmailTemplates';
import type { TaskCallback } from '../../wrapAppContext';

export const createTenant: TaskCallback = async (app) => {
  const fusionAuthClient = app.get<FusionAuthClient>(FusionAuthClient);
  const configService = app.get<ConfigService>(ConfigService);

  const jwtKeyId = configService.get<string>('FUSIONAUTH_JWT_KEY_ID');

  // JWT KEYS
  await fusionAuthClient.importKey(jwtKeyId, {
    key: {
      algorithm: KeyAlgorithm.HS256,
      kid: configService.get<string>('JWT_KID'),
      name: 'SHA-256 with HMAC (access and id tokens)',
      secret: configService.get<string>('JWT_SECRET'),
      type: KeyType.HMAC,
    },
  });

  // CLONE DEFAULT THEME
  const { response: themeResponse } = await fusionAuthClient.retrieveThemes();

  const theme = (themeResponse.themes || []).find(
    (t) => t?.name === 'FusionAuth',
  );
  if (!theme) {
    throw new Error('createTenant => DEFAULT THEME NOT FOUND');
  }
  const defaultThemeId = theme?.id;
  const themeId = configService.get<string>('FUSIONAUTH_THEME_ID');
  const appName = configService.get<string>('APP_NAME');

  await fusionAuthClient.createTheme(themeId, {
    sourceThemeId: defaultThemeId,
    theme: {
      name: appName,
    },
  });

  // EMAIL TEMPLATES
  await createEmailTemplates(app);

  // TENANT
  const tenantId = configService.get<string>('FUSIONAUTH_TENANT_ID');
  const issuer = configService.get<string>('APP_ISSUER');
  await fusionAuthClient.createTenant(tenantId, {
    tenant: {
      emailConfiguration: {
        host: configService.get<string>('EMAIL_HOST'),
        port: parseInt(configService.get<string>('EMAIL_PORT')),
        defaultFromEmail: configService.get<string>('EMAIL_FROM_EMAIL'),
        defaultFromName: configService.get<string>('EMAIL_FROM_NAME'),
        verifyEmail: true,
        verificationEmailTemplateId: configService.get<string>(
          'FUSIONAUTH_EMAIL_TEMPLATE_VERIFICATION_ID',
        ),
      },
      externalIdentifierConfiguration: {
        authorizationGrantIdTimeToLiveInSeconds: 30,
        changePasswordIdGenerator: {
          length: 32,
          type: SecureGeneratorType.randomBytes,
        },
        changePasswordIdTimeToLiveInSeconds: 600,
        deviceCodeTimeToLiveInSeconds: 1_800,
        deviceUserCodeIdGenerator: {
          length: 6,
          type: SecureGeneratorType.randomAlphaNumeric,
        },
        emailVerificationIdGenerator: {
          length: 6,
          type: SecureGeneratorType.randomBytes,
        },
        emailVerificationIdTimeToLiveInSeconds: 86_400,
        externalAuthenticationIdTimeToLiveInSeconds: 300,
        oneTimePasswordTimeToLiveInSeconds: 60,
        passwordlessLoginGenerator: {
          length: 32,
          type: SecureGeneratorType.randomBytes,
        },
        passwordlessLoginTimeToLiveInSeconds: 180,
        registrationVerificationIdGenerator: {
          length: 32,
          type: SecureGeneratorType.randomBytes,
        },
        registrationVerificationIdTimeToLiveInSeconds: 86_400,
        setupPasswordIdGenerator: {
          length: 32,
          type: SecureGeneratorType.randomBytes,
        },
        setupPasswordIdTimeToLiveInSeconds: 86_400,
        twoFactorIdTimeToLiveInSeconds: 300,
        twoFactorTrustIdTimeToLiveInSeconds: 2_592_000,
      },
      failedAuthenticationConfiguration: {
        actionDuration: 3,
        actionDurationUnit: ExpiryUnit.MINUTES,
        resetCountInSeconds: 60,
        tooManyAttempts: 5,
      },
      issuer,
      jwtConfiguration: {
        accessTokenKeyId: jwtKeyId,
        enabled: true,
        idTokenKeyId: jwtKeyId,
        refreshTokenExpirationPolicy: RefreshTokenExpirationPolicy.Fixed,
        refreshTokenRevocationPolicy: {
          onLoginPrevented: true,
          onPasswordChanged: true,
        },
        refreshTokenTimeToLiveInMinutes: 43_200,
        refreshTokenUsagePolicy: RefreshTokenUsagePolicy.Reusable,
        timeToLiveInSeconds: 3_600,
      },
      logoutURL: `${issuer}/logout`,
      name: appName,
      passwordValidationRules: {
        maxLength: 256,
        minLength: 8,
      },
      themeId,
    },
  });

  console.log('OK');
};
