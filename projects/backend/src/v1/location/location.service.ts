import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.location.findMany();
  }

  async findOne(id: string) {
    return this.prisma.location.findUnique({ where: { id } });
  }

async create(data: any) {
  const createdLocation = await this.prisma.location.create({
    data: {
      ...data,
      spaceId: data.spaceId, // Ensure spaceId is stored directly
    },
  });

  return {
    id: createdLocation.id,
    name: createdLocation.name,
    address: createdLocation.address,
    type: createdLocation.type,
    spaceId: createdLocation.spaceId, // Return spaceId as a flat ID
  };
}
  async update(id: string, data: any) {
    return this.prisma.location.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.location.delete({ where: { id } });
  }
}
