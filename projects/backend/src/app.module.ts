import { Module } from '@nestjs/common';
import { PrismaModule } from './v1/prisma/prisma.module';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [
    PrismaModule,
    V1Module
  ]
})
export class AppModule {}
