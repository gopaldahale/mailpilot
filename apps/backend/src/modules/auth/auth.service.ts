import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getMicrosoftAuthUrl() {
    const params = new URLSearchParams({
      client_id: process.env.MICROSOFT_CLIENT_ID!,
      response_type: 'code',
      redirect_uri: process.env.MICROSOFT_REDIRECT_URI!,
      response_mode: 'query',
      scope: 'openid profile email offline_access Mail.Read Mail.Send',
    });

    return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params.toString()}`;
  }
}