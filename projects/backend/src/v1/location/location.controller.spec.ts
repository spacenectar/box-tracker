import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

  const mockLocationService = {
    findAll: jest.fn().mockResolvedValue([
      { id: '1', spaceId: 'space-1', name: 'Warehouse', address: '123 Street', type: 'Storage' },
    ]),
    findOne: jest.fn((id) =>
      Promise.resolve({ id, spaceId: 'space-1', name: 'Warehouse', address: '123 Street', type: 'Storage' })
    ),
    create: jest.fn((dto) => Promise.resolve({ id: '2', ...dto })),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    delete: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [{ provide: LocationService, useValue: mockLocationService }],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all locations', async () => {
    expect(await controller.findAll()).toEqual([
      { id: '1', spaceId: 'space-1', name: 'Warehouse', address: '123 Street', type: 'Storage' },
    ]);
  });

  it('should return a single location by ID', async () => {
    expect(await controller.findOne('1')).toEqual({
      id: '1',
      spaceId: 'space-1',
      name: 'Warehouse',
      address: '123 Street',
      type: 'Storage',
    });
  });

  it('should create a location', async () => {
    const dto = { spaceId: 'space-1', name: 'Office', address: '456 Road', type: 'Workplace' };
    expect(await controller.create(dto)).toEqual({
      id: '2',
      spaceId: 'space-1',
      name: 'Office',
      address: '456 Road',
      type: 'Workplace',
    });
  });

  it('should update a location', async () => {
    const dto = { name: 'Updated Office', address: '789 Avenue' };
    expect(await controller.update('1', dto)).toEqual({
      id: '1',
      name: 'Updated Office',
      address: '789 Avenue',
    });
  });

  it('should delete a location', async () => {
    expect(await controller.delete('1')).toEqual({});
  });
});
