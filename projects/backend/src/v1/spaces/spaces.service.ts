import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpacesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.space.findMany();
  }

  async findOne(id: string) {
    return this.prisma.space.findUnique({ where: { id } });
  }

  async create(data: Prisma.SpaceCreateInput) {
    return this.prisma.space.create({ data });
  }

  async update(id: string, data: Prisma.SpaceUpdateInput) {
    return this.prisma.space.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.space.delete({ where: { id } });
  }
}
