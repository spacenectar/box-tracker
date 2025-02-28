import { Test, TestingModule } from '@nestjs/testing';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';

describe('SpacesController', () => {
  let controller: SpacesController;
  let service: SpacesService;

  const mockSpacesService = {
    findAll: jest.fn().mockResolvedValue([
      { id: '1', name: 'Test Space', slug: 'test-space', createdBy: 'user-1' },
    ]),
    findOne: jest.fn((id) =>
      Promise.resolve({ id, name: 'Single Space', slug: 'single-space', createdBy: 'user-1' })
    ),
    create: jest.fn((dto) => Promise.resolve({ id: '2', ...dto })),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    delete: jest.fn().mockResolvedValue({}),
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

  it('should return all spaces', async () => {
    expect(await controller.findAll()).toEqual([
      { id: '1', name: 'Test Space', slug: 'test-space', createdBy: 'user-1' },
    ]);
  });

  it('should return a single space by ID', async () => {
    expect(await controller.findOne('1')).toEqual({
      id: '1',
      name: 'Single Space',
      slug: 'single-space',
      createdBy: 'user-1',
    });
  });

  it('should create a space', async () => {
    const dto = {
      name: 'New Space',
      slug: 'new-space',
      createdBy: 'user-2',
      createdByUser: { connect: { id: 'user-2' } }
    };
    expect(await controller.create(dto)).toEqual({
      id: '2',
      name: 'New Space',
      slug: 'new-space',
      createdBy: 'user-2',
      createdByUser: { connect: { id: 'user-2' } }
    });
  });

  it('should update a space', async () => {
    const dto = { name: 'Updated Space', slug: 'updated-space' };
    expect(await controller.update('1', dto)).toEqual({
      id: '1',
      name: 'Updated Space',
      slug: 'updated-space',
    });
  });

  it('should delete a space', async () => {
    expect(await controller.delete('1')).toEqual({});
  });
});
