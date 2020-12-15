import { FusionAuthClient } from '@fusionauth/typescript-client';
import { ConfigService } from '@nestjs/config';
import type { TaskCallback } from '../../wrapAppContext';
import type { EmailTemplateRequest } from '@fusionauth/typescript-client';

export const createEmailTemplates: TaskCallback = async (app) => {
  const fusionAuthClient = app.get<FusionAuthClient>(FusionAuthClient);
  const configService = app.get<ConfigService>(ConfigService);

  const templates: EmailTemplateRequest[] = [
    {
      emailTemplate: {
        id: configService.get<string>(
          'FUSIONAUTH_EMAIL_TEMPLATE_VERIFICATION_ID',
        ),
        name: 'Email Verification',
        defaultSubject: 'Verify your NextGreatIdea email address',
        defaultHtmlTemplate: `
[#if user.verified]
Pro tip, your email has already been verified, but feel free to complete the verification process to verify your verification of your email address.
[/#if]

To complete your email verification click on the following link.
<p>
  <a href="http://localhost:9011/email/verify/\${verificationId}?tenantId=\${user.tenantId}">
    http://localhost:9011/email/verify/\${verificationId}?tenantId=\${user.tenantId}
  </a>
</p>

- FusionAuth Admin
        `,
        defaultTextTemplate: `
[#if user.verified]
Pro tip, your email has already been verified, but feel free to complete the verification process to verify your verification of your email address.
[/#if]

To complete your email verification click on the following link.

http://localhost:9011/email/verify/\${verificationId}?tenantId=\${user.tenantId}

- FusionAuth Admin
        `,
      },
    },
  ];

  const templateRequests = templates.map(async (t) => {
    const id = t.emailTemplate.id;
    const name = t.emailTemplate.name;

    delete t.emailTemplate.id;

    await fusionAuthClient.createEmailTemplate(id, t);
  });

  await Promise.all(templateRequests);

  console.log('OK');
};
