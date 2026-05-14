import { Controller,Get,Headers } from '@nestjs/common';
import {EmailService} from './email.service.js'

@Controller('email')
export class EmailController {
    constructor(private readonly emailService:EmailService){}

    @Get()
    async getEmails(@Headers('authorization') authHeader: string) {
        const accessToken = authHeader.replace('Bearer ', '');

        return this.emailService.getEmails(accessToken)
    }
}
