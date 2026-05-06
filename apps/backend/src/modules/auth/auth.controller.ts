import { Controller, Get, Res } from '@nestjs/common';
import * as express from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  login(@Res() res: express.Response) {
    const url = this.authService.getMicrosoftAuthUrl();

    return res.redirect(url);
  }
}