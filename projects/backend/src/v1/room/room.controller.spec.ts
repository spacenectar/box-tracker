import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

describe('RoomController', () => {
  let controller: RoomController;
  let service: RoomService;

  const mockRoomService = {
    findAll: jest.fn().mockImplementation((locationId) =>
      Promise.resolve([
        { id: '1', name: 'Living Room', slug: 'living-room', locationId, colour: '#FF5733' },
      ])
    ),
    findOne: jest.fn((id) =>
      Promise.resolve({ id, name: 'Living Room', slug: 'living-room', locationId: 'location-1', colour: '#FF5733' })
    ),
    create: jest.fn((dto) => Promise.resolve({ id: '2', ...dto })),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    delete: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [{ provide: RoomService, useValue: mockRoomService }],
    }).compile();

    controller = module.get<RoomController>(RoomController);
    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all rooms in a location', async () => {
    expect(await controller.findAll('location-1')).toEqual([
      { id: '1', name: 'Living Room', slug: 'living-room', locationId: 'location-1', colour: '#FF5733' },
    ]);
  });

  it('should return a single room by ID', async () => {
    expect(await controller.findOne('1')).toEqual({
      id: '1',
      name: 'Living Room',
      slug: 'living-room',
      locationId: 'location-1',
      colour: '#FF5733',
    });
  });

  it('should create a room', async () => {
    const dto = { name: 'New Room', slug: 'new-room', locationId: 'location-1', colour: '#FFFFFF' };

    expect(await controller.create(dto)).toEqual({
      id: '2',
      name: 'New Room',
      slug: 'new-room',
      locationId: 'location-1',
      colour: '#FFFFFF',
    });

    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should update a room', async () => {
    const dto = { name: 'Updated Room' };
    expect(await controller.update('1', dto)).toEqual({
      id: '1',
      name: 'Updated Room',
    });
  });

  it('should delete a room', async () => {
    expect(await controller.delete('1')).toEqual({});
  });
});
