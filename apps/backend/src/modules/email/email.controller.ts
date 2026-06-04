import { Controller, Get, Param } from '@nestjs/common';
import { EmailService } from './email.service.js'

@Controller('emails')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @Get(':userId')
    async getEmails(@Param('userId') userId: string) {

        return this.emailService.getEmails(userId)
    }
}
