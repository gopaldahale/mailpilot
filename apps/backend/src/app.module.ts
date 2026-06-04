import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { EmailModule } from './modules/email/email.module.js';
import { ChatModule } from './modules/chat/chat.module.js';
// import {
//   ThrottlerModule,
//   ThrottlerGuard,
// } from '@nestjs/throttler';
// import { APP_GUARD } from '@nestjs/core';



@Module({
  imports: [// 🌍 Environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 60000,
    //     limit: 10,
    //   },
    // ]),
    PrismaModule, AuthModule, EmailModule, ChatModule,],

  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: ThrottlerGuard,
  //   },
  // ],

})
export class AppModule { }
