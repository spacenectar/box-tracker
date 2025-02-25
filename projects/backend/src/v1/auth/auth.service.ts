import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  private readonly clerkVerifyUrl = 'https://api.clerk.dev/v1/tokens/verify';
  private readonly clerkSecret = process.env.CLERK_SECRET_KEY;

  async verifyToken(token: string) {
    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    try {
      const response = await axios.post(
        this.clerkVerifyUrl,
        { token },
        { headers: { Authorization: `Bearer ${this.clerkSecret}` } }
      );

      if (response.status !== 200) {
        throw new UnauthorizedException('Token verification failed');
      }

      return {
        sub: response.data.sub,
        email: response.data.email_address,
        username: response.data.username,
        photo: response.data.image_url,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
