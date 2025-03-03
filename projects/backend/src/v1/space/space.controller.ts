import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SpaceService } from './space.service';
import { Prisma } from '@prisma/client';
import { GetUser } from '../../decorators/getuser.decorator';

@Controller({ path: 'space', version: '1' })
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Get()
  async findAll(@GetUser() user: any) {
    return this.spaceService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: any) {
    return this.spaceService.findOne(id, user.id);
  }

  @Post()
  async create(@Body() data: any, @GetUser() user: any) {
    return this.spaceService.create({ ...data, createdBy: user.id }, user.id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.SpaceUpdateInput, @GetUser() user: any) {
    return this.spaceService.update(id, data, user.id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @GetUser() user: any) {
    return this.spaceService.delete(id, user.id);
  }
}
