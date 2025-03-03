import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

describe('ItemController', () => {
  let controller: ItemController;
  let service: ItemService;

  const mockItemService = {
    findAll: jest.fn().mockImplementation((boxId, locationId) =>
      Promise.resolve([
        { id: '1', name: 'Test Item', quantity: 2, value: 10.5, boxId, locationId },
      ])
    ),
    findOne: jest.fn((id) =>
      Promise.resolve({ id, name: 'Test Item', quantity: 2, value: 10.5, boxId: 'box-1', locationId: 'location-1' })
    ),
    create: jest.fn((dto) => Promise.resolve({ id: '2', ...dto })),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    delete: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [{ provide: ItemService, useValue: mockItemService }],
    }).compile();

    controller = module.get<ItemController>(ItemController);
    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all items in a box or location', async () => {
    expect(await controller.findAll('box-1', null)).toEqual([
      { id: '1', name: 'Test Item', quantity: 2, value: 10.5, boxId: 'box-1', locationId: null },
    ]);
  });

  it('should return a single item by ID', async () => {
    expect(await controller.findOne('1')).toEqual({
      id: '1',
      name: 'Test Item',
      quantity: 2,
      value: 10.5,
      boxId: 'box-1',
      locationId: 'location-1',
    });
  });

  it('should create an item', async () => {
    const dto = { name: 'New Item', quantity: 1, value: 15.0, boxId: 'box-1' };

    expect(await controller.create(dto)).toEqual({
      id: '2',
      name: 'New Item',
      quantity: 1,
      value: 15.0,
      boxId: 'box-1',
      locationId: null,
    });

    expect(service.create).toHaveBeenCalledWith({ ...dto, locationId: null });
  });

  it('should update an item', async () => {
    const dto = { name: 'Updated Item' };
    expect(await controller.update('1', dto)).toEqual({
      id: '1',
      name: 'Updated Item',
    });
  });

  it('should delete an item', async () => {
    expect(await controller.delete('1')).toEqual({});
  });
});
