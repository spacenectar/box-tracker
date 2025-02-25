import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Get user by auth_id
  async getUserByAuthId(authId: string) {
    const user = await this.prisma.user.findUnique({ where: { authId } });
    if (!user) throw new NotFoundException('User not found');

    // Mock auth data retrieval (replace with real integration later)
    const authData = this.getAuthUserData(authId);

    return {
      id: user.id,
      authId: user.authId,
      username: user.username,
      name: authData?.name || null,
      email: authData?.email || null,
      photo: authData?.photo || null,
      subscriber: user.subscriber,
      dateRegistered: user.dateRegistered,
      dateLastLoggedIn: user.dateLastLoggedIn,
    };
  }

  // Create a new user
  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  // Update user by auth_id
  async updateUser(authId: string, data: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { authId } });
    if (!user) throw new NotFoundException('User not found');

    // Ensure username is unique
    if (data.username) {
      const existingUser = await this.prisma.user.findUnique({ where: { username: data.username } });
      if (existingUser && existingUser.authId !== authId) {
        throw new BadRequestException('Username is already taken');
      }
    }

    return this.prisma.user.update({ where: { authId }, data });
  }

  // Delete user by auth_id
  async deleteUser(authId: string) {
    return this.prisma.user.delete({ where: { authId } });
  }

  // Mock method to get auth user data (Replace with real integration)
  private getAuthUserData(authId: string) {
    return {
      name: 'Mock Name',
      email: `mock-${authId}@example.com`,
      photo: 'https://example.com/avatar.png',
    };
  }
}
