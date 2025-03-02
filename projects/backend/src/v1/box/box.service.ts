import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BoxService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.box.findMany();
  }

  async findOne(id: string) {
    const box = await this.prisma.box.findUnique({ where: { id } });
    if (!box) throw new NotFoundException('Box not found');
    return box;
  }

  async create(data: any) {
    // Ensure slug is unique
    const existingBox = await this.prisma.box.findUnique({ where: { slug: data.slug } });
    if (existingBox) throw new ConflictException('A box with this slug already exists');

    return this.prisma.box.create({ data });
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
