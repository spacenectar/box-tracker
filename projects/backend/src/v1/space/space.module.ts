import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [SpaceController],
  providers: [SpaceService, PrismaService],
})
export class SpaceModule {}
