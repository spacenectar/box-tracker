import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpacesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.space.findMany({
      where: {
        spaceUsers: {
          some: { userId },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const space = await this.prisma.space.findUnique({ where: { id } });

    if (!space) throw new ForbiddenException('Space not found');

    const userHasAccess = await this.prisma.spaceUser.findFirst({
      where: { spaceId: id, userId },
    });

    if (!userHasAccess) throw new ForbiddenException('Access denied');

    return space;
  }

  async create(data: any, userId: string) {
    const createdSpace = await this.prisma.space.create({
      data: {
        ...data,
        createdBy: userId, // Store just the UUID, not a relation
      },
    });

    return {
      id: createdSpace.id,
      name: createdSpace.name,
      slug: createdSpace.slug,
      createdBy: createdSpace.createdBy, // Ensure a flat ID is returned
    };
  }

  async update(id: string, data: Prisma.SpaceUpdateInput, userId: string) {
    const space = await this.prisma.space.findUnique({ where: { id } });

    if (!space) throw new ForbiddenException('Space not found');

    const userHasAccess = await this.prisma.spaceUser.findFirst({
      where: { spaceId: id, userId },
    });

    if (!userHasAccess) throw new ForbiddenException('Access denied');

    return this.prisma.space.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, userId: string) {
    const space = await this.prisma.space.findUnique({ where: { id } });

    if (!space) throw new ForbiddenException('Space not found');

    const userHasAccess = await this.prisma.spaceUser.findFirst({
      where: { spaceId: id, userId },
    });

    if (!userHasAccess) throw new ForbiddenException('Access denied');

    return this.prisma.space.delete({ where: { id } });
  }
}
