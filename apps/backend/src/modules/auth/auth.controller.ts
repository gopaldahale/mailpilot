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
  @Get('callback')
  async callback(@Query('code') code: string) {
    const tokens = await this.authService.exchangeCodeForToken(code);

    const profile = await this.authService.getMicrosoftProfile(tokens.access_token,);

    return { profile, tokens };
  }
}