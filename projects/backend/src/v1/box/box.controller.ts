import { Controller, Get, Post, Patch, Delete, Body, Param, BadRequestException, Query } from '@nestjs/common';
import { BoxService } from './box.service';
import { Prisma } from '@prisma/client';

@Controller({ path: 'box', version: '1' })
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Get()
  async findAll(@Query('locationId') locationId: string) {
    if (!locationId) {
      throw new BadRequestException('locationId is required');
    }
    return this.boxService.findAll(locationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.boxService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.boxService.create({
      ...data,
      locationId: data.locationId, // Ensure locationId is passed as a flat ID
    });
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
