import { Test, TestingModule } from '@nestjs/testing';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';

describe('SpacesController', () => {
  let controller: SpacesController;
  let service: SpacesService;

  const mockSpacesService = {
    findAll: jest.fn().mockImplementation((userId) =>
      Promise.resolve([
        { id: '1', name: 'Test Space', slug: 'test-space', createdBy: userId },
      ])
    ),
    findOne: jest.fn((id, userId) =>
      Promise.resolve({ id, name: 'Single Space', slug: 'single-space', createdBy: userId })
    ),
    create: jest.fn((dto, userId) =>
      Promise.resolve({ id: '2', ...dto, createdBy: userId })
    ),
    update: jest.fn((id, dto, userId) =>
      Promise.resolve({ id, ...dto })
    ),
    delete: jest.fn((id, userId) =>
      Promise.resolve({ success: true })
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpacesController],
      providers: [{ provide: SpacesService, useValue: mockSpacesService }],
    }).compile();

    controller = module.get<SpacesController>(SpacesController);
    service = module.get<SpacesService>(SpacesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all spaces for a user', async () => {
    const user = { id: 'user-1' };
    expect(await controller.findAll(user)).toEqual([
      { id: '1', name: 'Test Space', slug: 'test-space', createdBy: 'user-1' },
    ]);
    expect(service.findAll).toHaveBeenCalledWith(user.id);
  });

  it('should return a single space by ID for a user', async () => {
    const user = { id: 'user-1' };
    expect(await controller.findOne('1', user)).toEqual({
      id: '1',
      name: 'Single Space',
      slug: 'single-space',
      createdBy: 'user-1',
    });
    expect(service.findOne).toHaveBeenCalledWith('1', user.id);
  });

  it('should create a space', async () => {
    const dto = {
      name: 'New Space',
      slug: 'new-space',
    };
    const user = { id: 'user-2' };

    expect(await controller.create(dto, user)).toEqual({
      id: '2',
      name: 'New Space',
      slug: 'new-space',
      createdBy: 'user-2',
    });

    expect(service.create).toHaveBeenCalledWith({ ...dto, createdBy: user.id }, user.id);
  });

  it('should update a space', async () => {
    const dto = { name: 'Updated Space', slug: 'updated-space' };
    const user = { id: 'user-1' };

    expect(await controller.update('1', dto, user)).toEqual({
      id: '1',
      name: 'Updated Space',
      slug: 'updated-space',
    });

    expect(service.update).toHaveBeenCalledWith('1', dto, user.id);
  });

  it('should delete a space', async () => {
    const user = { id: 'user-1' };

    expect(await controller.delete('1', user)).toEqual({ success: true });

    expect(service.delete).toHaveBeenCalledWith('1', user.id);
  });
});
