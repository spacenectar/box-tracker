import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { BoxService } from './box.service';
import { Prisma } from '@prisma/client';

@Controller('v1/box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Get()
  async findAll() {
    return this.boxService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.boxService.findOne(id);
  }

  @Post()
  async create(@Body() data: Prisma.BoxCreateInput) {
    return this.boxService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.BoxUpdateInput) {
    return this.boxService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.boxService.delete(id);
  }
}
