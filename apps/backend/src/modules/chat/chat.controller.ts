import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ChatService } from './chat.service.js';


@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Post()
  async chat(
    @Body('prompt') prompt: string,
    @Body('userId') userId: string,
  ) {

    return this.chatService.chat(prompt, userId);
  }
}