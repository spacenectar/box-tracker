import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { Prisma } from '@prisma/client';
import { GetUser } from '../../decorators/getuser.decorator';

@Controller('v1/spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Get()
  async findAll(@GetUser() user: any) {
    return this.spacesService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: any) {
    return this.spacesService.findOne(id, user.id);
  }

  @Post()
  async create(@Body() data: any, @GetUser() user: any) {
    return this.spacesService.create({ ...data, createdBy: user.id }, user.id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.SpaceUpdateInput, @GetUser() user: any) {
    return this.spacesService.update(id, data, user.id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @GetUser() user: any) {
    return this.spacesService.delete(id, user.id);
  }
}
