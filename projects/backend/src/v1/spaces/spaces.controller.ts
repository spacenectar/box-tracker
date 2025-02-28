import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { Prisma } from '@prisma/client';

@Controller('v1/spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Get()
  async findAll() {
    return this.spacesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.spacesService.findOne(id);
  }

  @Post()
  async create(@Body() data: Prisma.SpaceCreateInput) {
    return this.spacesService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.SpaceUpdateInput) {
    return this.spacesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.spacesService.delete(id);
  }
}
