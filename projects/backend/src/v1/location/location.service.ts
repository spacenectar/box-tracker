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
    return this.prisma.location.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.location.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.location.delete({ where: { id } });
  }
}
