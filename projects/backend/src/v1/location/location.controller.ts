import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('v1/locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.locationService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.locationService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.locationService.delete(id);
  }
}
