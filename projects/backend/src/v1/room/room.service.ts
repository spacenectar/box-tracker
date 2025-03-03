import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(locationId: string) {
    if (!locationId) {
      throw new BadRequestException('locationId is required');
    }

    return this.prisma.room.findMany({
      where: { locationId },
    });
  }

  async findOne(id: string) {
    const room = await this.prisma.room.findUnique({ where: { id } });
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async create(data: any) {
    const createdRoom = await this.prisma.room.create({
      data: {
        ...data,
        locationId: data.locationId, // Store locationId directly
      },
    });

    return {
      id: createdRoom.id,
      name: createdRoom.name,
      slug: createdRoom.slug,
      locationId: createdRoom.locationId,
      colour: createdRoom.colour,
      dateAdded: createdRoom.dateAdded,
    };
  }

  async update(id: string, data: any) {
    const existingRoom = await this.prisma.room.findUnique({ where: { id } });
    if (!existingRoom) throw new NotFoundException('Room not found');

    return this.prisma.room.update({
      where: { id },
      data: { ...data, dateLastModified: new Date() },
    });
  }

  async delete(id: string) {
    const existingRoom = await this.prisma.room.findUnique({ where: { id } });
    if (!existingRoom) throw new NotFoundException('Room not found');

    return this.prisma.room.delete({ where: { id } });
  }
}
