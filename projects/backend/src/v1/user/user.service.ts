import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ClerkService } from '../../auth/clerk.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clerkService: ClerkService
  ) {}

  // Get user by authId
  async getUserByAuthId(authId: string) {
    const user = await this.prisma.user.findUnique({ where: { authId } });
    if (!user) throw new NotFoundException('User not found');

    // Fetch user details from Clerk
    const clerkUser = await this.clerkService.getUser(authId);
    if (!clerkUser) throw new NotFoundException('User not found in Clerk');

    // Merge DB user data with Clerk user data
    return {
      id: user.id,
      authId: user.authId,
      username: clerkUser.username,
      subscriber: user.subscriber,
      dateRegistered: user.dateRegistered,
      dateLastLoggedIn: user.dateLastLoggedIn,
      email: clerkUser.email_addresses?.[0]?.email_address || null,
      firstName: clerkUser.first_name,
      lastName: clerkUser.last_name,
      imageUrl: clerkUser.image_url,
    };
  }

  // Create a new user
  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  // Update user by authId
  async updateUser(authId: string, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { authId } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({ where: { authId }, data });
  }

  // Delete user by authId
  async deleteUser(authId: string) {
    return this.prisma.user.delete({ where: { authId } });
  }
}
