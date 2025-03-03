import { Controller, Get, Post, Body, Param, Put, Delete, Query, BadRequestException } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async findAll(@Query('locationId') locationId: string) {
    if (!locationId) {
      throw new BadRequestException('locationId is required');
    }
    return this.roomService.findAll(locationId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.roomService.create({
      ...data,
      locationId: data.locationId, // Ensure locationId is passed as a flat ID
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.roomService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.roomService.delete(id);
  }
}
