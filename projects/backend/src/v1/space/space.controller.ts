import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SpaceService } from './space.service';
import { UserService } from '../user/user.service';
import { Prisma } from '@prisma/client';
import { GetUser } from '../../decorators/getuser.decorator';

@Controller({ path: 'space', version: '1' })
export class SpaceController {
  constructor(
    private readonly spaceService: SpaceService,
    private readonly userService: UserService
  ) {}

  @Get()
  async findAll(@GetUser() user: any) {
    const dbUser = await this.userService.getUserByAuthId(user.id);
    return this.spaceService.findAll(dbUser.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: any) {
    const dbUser = await this.userService.getUserByAuthId(user.id);
    return this.spaceService.findOne(id, dbUser.id);
  }

  @Post()
  async create(@Body() data: any, @GetUser() user: any) {
    const dbUser = await this.userService.getUserByAuthId(user.id);
    return this.spaceService.create({ ...data, createdBy: dbUser.id }, dbUser.id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.SpaceUpdateInput, @GetUser() user: any) {
    const dbUser = await this.userService.getUserByAuthId(user.id);
    return this.spaceService.update(id, data, dbUser.id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @GetUser() user: any) {
    const dbUser = await this.userService.getUserByAuthId(user.id);
    return this.spaceService.delete(id, dbUser.id);
  }
}
