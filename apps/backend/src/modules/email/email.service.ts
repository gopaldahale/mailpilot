import { Injectable } from '@nestjs/common';
import axios from 'axios'; 

@Injectable()
export class EmailService {
    async getEmails(accessToken: string) {
        const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages?$select=subject,from,receivedDateTime,bodyPreview',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
        return response.data
    }
}
