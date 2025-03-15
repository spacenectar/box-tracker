import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}
  
  // Helper method to generate a slug from a name
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async findAll(userId: string) {
    return this.prisma.location.findMany({
      where: {
        userLocations: {
          some: { userId }
        }
      }
    });
  }

  async findOne(id: string, userId: string) {
    const location = await this.prisma.location.findUnique({ 
      where: { id },
      include: { userLocations: true }
    });
    
    if (!location) return null;
    
    // Check if user has access to this location
    const hasAccess = location.userLocations.some(ul => ul.userId === userId);
    if (!hasAccess) return null;
    
    return location;
  }

async create(data: any) {
  // Get the user ID from the data and remove it from the location data
  const userId = data.userId;
  const { userId: _, ...locationData } = data;
  
  // Generate a slug from the name if not provided
  if (!locationData.slug) {
    locationData.slug = this.generateSlug(locationData.name);
  }
  
  // Set date fields
  const now = new Date();
  locationData.dateLastModified = now;
  locationData.dateLastAccessed = now;
  
  // Use a transaction to ensure all operations succeed or fail together
  const result = await this.prisma.$transaction(async (prisma) => {
    // Check if the slug already exists in this space
    let locationSlug = locationData.slug;
    let locationCounter = 1;
    
    // Check if the slug already exists in this space
    let locationWithSlug = await prisma.location.findFirst({
      where: {
        spaceId: locationData.spaceId,
        slug: {
          equals: locationSlug
        }
      },
    });
    
    // If the slug exists, append a number until we find a unique one
    while (locationWithSlug) {
      locationSlug = `${locationData.slug}-${locationCounter}`;
      locationCounter++;
      locationWithSlug = await prisma.location.findFirst({
        where: {
          spaceId: locationData.spaceId,
          slug: {
            equals: locationSlug
          }
        },
      });
    }
    
    // Update the slug if it was changed
    locationData.slug = locationSlug;
    
    // Create the location
    const createdLocation = await prisma.location.create({
      data: locationData,
    });
    
    // Generate a unique slug for the default room
    const locationId = createdLocation.id;
    const baseSlug = 'default-room';
    let roomSlug = baseSlug;
    let counter = 1;
    
    // Check if the slug already exists in this location
    let roomWithSlug = await prisma.room.findFirst({
      where: {
        locationId,
        slug: {
          equals: roomSlug
        }
      },
    });
    
    // If the slug exists, append a number until we find a unique one
    while (roomWithSlug) {
      roomSlug = `${baseSlug}-${counter}`;
      counter++;
      roomWithSlug = await prisma.room.findFirst({
        where: {
          locationId,
          slug: {
            equals: roomSlug
          }
        },
      });
    }
    
    // Create the default room with the unique slug
    const now = new Date();
    await prisma.room.create({
      data: {
        name: 'Default Room',
        slug: roomSlug,
        locationId,
        colour: '#CCCCCC',
        dateLastModified: now,
        dateLastAccessed: now,
      },
    });
    
    // Create the association in the UserLocation join table if userId is provided
    if (userId) {
      await prisma.userLocation.create({
        data: {
          userId,
          locationId,
        },
      });
    }
    
    return createdLocation;
  });
  
  return {
    id: result.id,
    name: result.name,
    address: result.address,
    type: result.type,
    spaceId: result.spaceId,
  };
}
  async update(id: string, data: any, userId: string) {
    // Check if user has access to this location
    const location = await this.findOne(id, userId);
    if (!location) throw new Error('Location not found or access denied');
    
    // Set dateLastModified to current date
    data.dateLastModified = new Date();
    
    return this.prisma.location.update({ 
      where: { id }, 
      data 
    });
  }

  async delete(id: string, userId: string) {
    // Check if user has access to this location
    const location = await this.findOne(id, userId);
    if (!location) throw new Error('Location not found or access denied');
    
    return this.prisma.location.delete({ 
      where: { id } 
    });
  }
}
