import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ChatService } from './chat.service.js';

import { Req, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from '../auth/auth.service.js';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) { }

  @Post()
  async chat(
    @Body('prompt') prompt: string,
    @Req() req: Request,
  ) {
    const token =
      req.cookies?.access_token;

    if (!token) {
      throw new UnauthorizedException();
    }

    const payload =
      this.authService.verifyJwt(token);

    return this.chatService.chat(
      prompt,
      payload.sub,
    );
  }
}