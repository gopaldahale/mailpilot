import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('login')
  login(@Res() res: Response) {
    const url = this.authService.getMicrosoftAuthUrl();

    return res.redirect(url);
  }
  // @Get('callback')
  // async callback(@Query('code') code: string) {
  //   console.log('Received code:', code);
  //   const tokens = await this.authService.exchangeCodeForToken(code);

  //   const profile = await this.authService.getMicrosoftProfile(tokens.access_token,);

  //   return { profile, tokens };
  // }
  @Get('callback')
  async callback(@Query('code') code: string) {
    // console.log('Received code:', code);

    try {
      const tokens = await this.authService.exchangeCodeForToken(code);

      // console.log('Tokens:', tokens);

      const profile = await this.authService.getMicrosoftProfile(
        tokens.access_token,
      );

      const user = await this.authService.findOrCreateUser(profile);

      await this.authService.saveTokens(
        user.id,
        tokens.access_token,
        tokens.refresh_token,
        tokens.expires_in,
      );

      // return { profile, tokens };
      return {
        message: 'Login successful',
        user
      };
      
    } catch (error: any) {
      // console.log('ERROR RESPONSE:');
      // console.log(error.response?.data);

      return error.response?.data;
    }
  }
}