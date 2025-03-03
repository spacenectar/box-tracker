import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BoxService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(locationId: string) {
    return this.prisma.box.findMany({
      where: { locationId },
    });
  }

  async findOne(id: string) {
    const box = await this.prisma.box.findUnique({ where: { id } });
    if (!box) throw new NotFoundException('Box not found');
    return box;
  }

  async create(data: any) {
    const createdBox = await this.prisma.box.create({
      data: {
        ...data,
        locationId: data.locationId, // Store locationId directly
      },
    });

    return {
      id: createdBox.id,
      name: createdBox.name,
      slug: createdBox.slug,
      locationId: createdBox.locationId, // Return locationId as a flat ID
      sealed: createdBox.sealed,
    };
  }

  async update(id: string, data: any) {
    const existingBox = await this.prisma.box.findUnique({ where: { id } });
    if (!existingBox) throw new NotFoundException('Box not found');

    return this.prisma.box.update({
      where: { id },
      data: { ...data, dateLastModified: new Date() },
    });
  }

  async delete(id: string) {
    const existingBox = await this.prisma.box.findUnique({ where: { id } });
    if (!existingBox) throw new NotFoundException('Box not found');

    return this.prisma.box.delete({ where: { id } });
  }
}
