import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { EmailModule } from './modules/email/email.module';



@Module({
  imports: [// 🌍 Environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),PrismaModule,  AuthModule, EmailModule,],
})
export class AppModule { }
