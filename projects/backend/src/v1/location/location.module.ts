import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [LocationController],
  providers: [LocationService, PrismaService],
})
export class LocationModule {}
