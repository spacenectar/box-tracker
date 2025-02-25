import {
  Controller, Get, Post, Patch, Delete, Param, Body, Req, UnauthorizedException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AuthenticatedRequest } from '../../../types/express'; // Import the extended request type

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get the current user info
  @Get('/me')
  async getCurrentUser(@Req() req: AuthenticatedRequest) {
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    // Use the user service to get the trimmed version of the user
    return this.userService.getUserByAuthId(req.user.id);
  }

  // Get a user by auth_id instead of database ID
  @Get(':auth_id')
  async getUser(@Param('auth_id') authId: string) {
    return this.userService.getUserByAuthId(authId);
  }

  // Create a new user
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // Update a user
  @Patch(':auth_id')
  async updateUser(@Param('auth_id') authId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(authId, updateUserDto);
  }

  // Delete a user
  @Delete(':auth_id')
  async deleteUser(@Param('auth_id') authId: string) {
    return this.userService.deleteUser(authId);
  }
}
