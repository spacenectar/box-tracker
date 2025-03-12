import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpaceService {
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
    // Generate a slug from the name if not provided
    if (!data.slug && data.name) {
      data.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    
    // Set date fields
    const now = new Date();
    data.dateLastModified = now;
    data.dateLastAccessed = now;
    
    // Create the space and associate it with the user in a transaction
    const result = await this.prisma.$transaction(async (prisma) => {
      // Create the space
      const createdSpace = await prisma.space.create({
        data: {
          ...data,
          createdBy: userId,
        },
      });

      // Create the association in the SpaceUser join table
      await prisma.spaceUser.create({
        data: {
          userId: userId,
          spaceId: createdSpace.id,
          role: 'OWNER', // Assuming there's a role field, if not you can remove this
        },
      });

      return createdSpace;
    });

    return {
      id: result.id,
      name: result.name,
      slug: result.slug,
      createdBy: result.createdBy,
    };
  }

  async update(id: string, data: Prisma.SpaceUpdateInput, userId: string) {
    const space = await this.prisma.space.findUnique({ where: { id } });

    if (!space) throw new ForbiddenException('Space not found');

    const userHasAccess = await this.prisma.spaceUser.findFirst({
      where: { spaceId: id, userId },
    });

    if (!userHasAccess) throw new ForbiddenException('Access denied');
    
    // Set dateLastModified to current date
    data.dateLastModified = new Date();

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
