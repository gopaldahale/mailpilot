import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  login(@Res() res: Response) {
    const url = this.authService.getMicrosoftAuthUrl();

    return res.redirect(url);
  }
}