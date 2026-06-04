import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AuthService } from '../auth/auth.service.js';

@Injectable()
export class EmailService {

    constructor(private readonly authService: AuthService,) { }

    async getEmails(userId: string) {

        const accessToken = await this.authService.getValidAccessToken(userId);

        // https://graph.microsoft.com/v1.0/me/messages?$top=10
        const res = await axios.get('https://graph.microsoft.com/v1.0/me/messages',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        const response = res.data.value.map((email: any) => ({
            id: email.id,
            subject: email.subject,
            from: email.from?.emailAddress?.address ?? '',
            senderName: email.from?.emailAddress?.name ?? '',
            preview: email.bodyPreview,
            receivedAt: email.receivedDateTime,
            isRead: email.isRead,
        }))

        return response
    }
}
