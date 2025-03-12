import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { ClerkAuthGuard } from '../../auth/clerk-auth.guard';
import { UserService } from '../user/user.service';
import { GetUser } from '../../decorators/getuser.decorator';

@Controller({ path: 'location', version: '1' })
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly userService: UserService
  ) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  async findAll(@GetUser() user: any) {
    const dbUser = await this.userService.getUserByAuthId(user.id);
    return this.locationService.findAll(dbUser.id);
  }

  @Get(':id')
  @UseGuards(ClerkAuthGuard)
  async findOne(@Param('id') id: string, @GetUser() user: any) {
    const dbUser = await this.userService.getUserByAuthId(user.id);
    return this.locationService.findOne(id, dbUser.id);
  }

  @Post()
  @UseGuards(ClerkAuthGuard)
  async create(@Body() data: any, @GetUser() user: any) {
    // Get the database user ID from the auth ID
    const dbUser = await this.userService.getUserByAuthId(user.id);
    
    // Add the user ID to the data
    const locationData = {
      ...data,
      userId: dbUser.id
    };
    
    return this.locationService.create(locationData);
  }

  @Put(':id')
  @UseGuards(ClerkAuthGuard)
  async update(@Param('id') id: string, @Body() data: any, @GetUser() user: any) {
    const dbUser = await this.userService.getUserByAuthId(user.id);
    return this.locationService.update(id, data, dbUser.id);
  }

  @Delete(':id')
  @UseGuards(ClerkAuthGuard)
  async delete(@Param('id') id: string, @GetUser() user: any) {
    const dbUser = await this.userService.getUserByAuthId(user.id);
    return this.locationService.delete(id, dbUser.id);
  }
}
