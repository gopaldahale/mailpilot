import { Injectable } from '@nestjs/common';
import { decrypt, encrypt } from '../../common/utils/encryption.util.js'
import { PrismaService } from '../../prisma/prisma.service.js';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }

  // Build Microsoft auth URL  
  getMicrosoftAuthUrl() {
    const params = new URLSearchParams({
      client_id: process.env.MICROSOFT_CLIENT_ID!,
      response_type: 'code',
      redirect_uri: process.env.MICROSOFT_REDIRECT_URI!,
      response_mode: 'query',
      scope: 'openid profile email offline_access User.Read Mail.Read Mail.Send',
    });

    return `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params.toString()}`;
  }

  // Exchange code for tokens 
  async exchangeCodeForToken(code: string) {
    const response = await axios.post(
      'https://login.microsoftonline.com/common/oauth2/v2.0/token',

      new URLSearchParams({
        client_id: process.env.MICROSOFT_CLIENT_ID!,
        client_secret: process.env.MICROSOFT_CLIENT_SECRET!,
        code,
        redirect_uri: process.env.MICROSOFT_REDIRECT_URI!,
        grant_type: 'authorization_code',
      }),

      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data;
  }

  // Get user profile 
  async getMicrosoftProfile(accessToken: string) {

    // console.log('Access token exists:', !!accessToken);

    const response = await axios.get(
      'https://graph.microsoft.com/v1.0/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  }

  // Create or find user
  async findOrCreateUser(profile: any) {
    const email = profile.mail || profile.userPrincipalName

    // 🧠 Why upsert? Instead of: find [user,if not found,create user]
    return this.prisma.user.upsert({
      where: { email, },
      update: {},
      create: {
        email,
        name: profile.displayName,
      }
    })
  }

  // Save OAuth tokens 
  async saveTokens(
    userId: string,
    accessToken: string,
    refreshToken: string,
    expiresIn: number
  ) {
    return this.prisma.oAuthToken.upsert({
      where: {
        userId_provider: {
          userId,
          provider: 'microsoft'
        }
      },
      update: {
        accessToken: encrypt(accessToken),
        refreshToken: encrypt(refreshToken),
        expiresAt: new Date(Date.now() + expiresIn * 1000)
      },
      create: {
        userId,
        provider: 'microsoft',
        accessToken: encrypt(accessToken),
        refreshToken: encrypt(refreshToken),
        expiresAt: new Date(Date.now() + expiresIn * 1000)
      }
    })
  }

  // Get active access token
  async getValidAccessToken(userId: string) {
    const tokenRecord = await this.prisma.oAuthToken.findUnique({
      where: {
        userId_provider: {
          userId,
          provider: 'microsoft'
        }
      }
    });

    if (!tokenRecord) {
      throw new Error('No Microsoft token found')
    };

    const accessToken = decrypt(tokenRecord.accessToken)

    console.log('Valid access token is', accessToken);

    return accessToken

  }
}

