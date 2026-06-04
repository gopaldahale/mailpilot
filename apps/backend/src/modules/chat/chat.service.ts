import { Injectable } from '@nestjs/common';
import { GeminiService } from './gemini.service.js';
import { EmailService } from '../email/email.service.js';

@Injectable()
export class ChatService {
    constructor(
        private readonly geminiService: GeminiService,
        private readonly emailService: EmailService,) { }

    async chat(prompt: string, userId: string) {
        const emails = await this.emailService.getEmails(userId);

        const emailContext = JSON.stringify(emails.slice(0, 5));

        const finalPrompt = `
    User Request:
    ${prompt}

    Emails:
    ${emailContext}
  `;

        const response =
            await this.geminiService.generateResponse(finalPrompt);

        return {
            reply: response,
        };
    }
}