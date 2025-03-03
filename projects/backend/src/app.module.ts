// src/app.module.ts
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { V1Module } from './v1/v1.module';
import { ClerkAuthGuard } from './auth/clerk-auth.guard'; // adjust path if needed

@Module({
  imports: [
    PrismaModule,
    V1Module,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
})
export class AppModule {}
