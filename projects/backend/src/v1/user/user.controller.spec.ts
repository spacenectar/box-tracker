import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { ClerkService } from '../../auth/clerk.service';
import { ClerkAuthGuard } from '../../auth/clerk-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    getUserByAuthId: jest.fn((authId) => ({
      id: '123',
      authId,
      subscriber: false,
      dateRegistered: new Date(),
      dateLastLoggedIn: new Date(),
    })),
  };

  const mockClerkService = {
    getUser: jest.fn((authId) => ({
      id: authId,
      email: 'test@example.com',
    })),
  };

  const mockClerkAuthGuard = {
    canActivate: jest.fn((context: ExecutionContext) => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ClerkService, useValue: mockClerkService },
        { provide: PrismaService, useValue: {} }, // Mock Prisma to avoid DB calls
      ],
    })
      .overrideGuard(ClerkAuthGuard)
      .useValue(mockClerkAuthGuard)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user data when calling `me` endpoint', async () => {
    const authId = 'test-auth-id';
    const result = await controller.getUser(authId);

    expect(result).toEqual({
      id: '123',
      authId: 'test-auth-id',
      subscriber: false,
      dateRegistered: expect.any(Date),
      dateLastLoggedIn: expect.any(Date),
    });

    expect(service.getUserByAuthId).toHaveBeenCalledWith(authId);
  });
});
