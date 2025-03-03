import { Controller, Get, Post, Body, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller({ path: 'item', version: '1' })
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAll(@Query('boxId') boxId?: string, @Query('locationId') locationId?: string) {
    if (!boxId && !locationId) {
      throw new BadRequestException('Either boxId or locationId is required');
    }
    return this.itemService.findAll(boxId, locationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.itemService.create({
      ...data,
      boxId: data.boxId ?? null,
      locationId: data.locationId ?? null,
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.itemService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.itemService.delete(id);
  }
}
