import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(boxId?: string, locationId?: string) {
    if (!boxId && !locationId) {
      throw new BadRequestException('Either boxId or locationId is required');
    }

    return this.prisma.item.findMany({
      where: {
        OR: [
          boxId ? { boxId } : {},
          locationId ? { locationId } : {},
        ],
      },
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.item.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async create(data: any) {
    const createdItem = await this.prisma.item.create({
      data: {
        ...data,
        boxId: data.boxId ?? null,
        locationId: data.locationId ?? null,
      },
    });

    return {
      id: createdItem.id,
      name: createdItem.name,
      slug: createdItem.slug,
      description: createdItem.description,
      photo: createdItem.photo,
      condition: createdItem.condition,
      quantity: createdItem.quantity,
      value: createdItem.value,
      boxId: createdItem.boxId,
      locationId: createdItem.locationId,
      dateAdded: createdItem.dateAdded,
    };
  }

  async update(id: string, data: any) {
    const existingItem = await this.prisma.item.findUnique({ where: { id } });
    if (!existingItem) throw new NotFoundException('Item not found');

    return this.prisma.item.update({
      where: { id },
      data: { ...data, dateLastModified: new Date() },
    });
  }

  async delete(id: string) {
    const existingItem = await this.prisma.item.findUnique({ where: { id } });
    if (!existingItem) throw new NotFoundException('Item not found');

    return this.prisma.item.delete({ where: { id } });
  }
}
