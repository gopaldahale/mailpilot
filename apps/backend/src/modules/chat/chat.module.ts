import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller.js';
import { GeminiService } from './gemini.service.js';
import {ChatService} from './chat.service.js'
import { EmailModule } from '../email/email.module.js';

@Module({
  controllers: [ChatController],
  providers: [GeminiService,ChatService ],
  imports: [EmailModule]
})
export class ChatModule {}
