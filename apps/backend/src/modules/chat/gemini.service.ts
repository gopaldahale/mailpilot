import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!,
  );

  async generateResponse(prompt: string) {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
    });

    const result = await model.generateContent(prompt);

    return result.response.text();
  }
}