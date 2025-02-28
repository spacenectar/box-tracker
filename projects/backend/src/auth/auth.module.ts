import { Module } from '@nestjs/common';
import { ClerkStrategy } from './clerk.strategy';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { ClerkClientProvider } from '../providers/clerk-client.provider';
import { ClerkService } from './clerk.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PassportModule, ConfigModule, HttpModule],
  providers: [ClerkStrategy, ClerkClientProvider, ClerkService],
  exports: [PassportModule, ClerkService],
})
export class AuthModule {}
