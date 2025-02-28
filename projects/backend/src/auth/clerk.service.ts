import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClerkService {
  private baseUrl: string;

  constructor(
    private readonly httpService: HttpService, // Ensure correct naming
    private readonly config: ConfigService
  ) {
    this.baseUrl = 'https://api.clerk.dev/v1';
  }

  async getUser(authId: string): Promise<any> {
    const apiKey = this.config.get<string>('CLERK_SECRET_KEY');
    if (!apiKey) throw new Error('Missing Clerk API Key');

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/users/${authId}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        })
      );
      return response.data;
    } catch (error) {
      return null; // User not found in Clerk
    }
  }
}
