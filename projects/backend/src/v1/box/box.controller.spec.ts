import { Test, TestingModule } from '@nestjs/testing';
import { BoxController } from './box.controller';
import { BoxService } from './box.service';

describe('BoxController', () => {
  let controller: BoxController;
  let service: BoxService;

  const mockBoxService = {
    findAll: jest.fn().mockResolvedValue([
      { id: '1', name: 'Test Box', slug: 'test-box', locationId: 'location-1', sealed: false },
    ]),
    findOne: jest.fn((id) =>
      Promise.resolve({ id, name: 'Test Box', slug: 'test-box', locationId: 'location-1', sealed: false })
    ),
    create: jest.fn((dto) => Promise.resolve({ id: '2', ...dto })),
    update: jest.fn((id, dto) => Promise.resolve({ id, ...dto })),
    delete: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoxController],
      providers: [{ provide: BoxService, useValue: mockBoxService }],
    }).compile();

    controller = module.get<BoxController>(BoxController);
    service = module.get<BoxService>(BoxService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all boxes', async () => {
    expect(await controller.findAll()).toEqual([
      { id: '1', name: 'Test Box', slug: 'test-box', locationId: 'location-1', sealed: false },
    ]);
  });

  it('should return a single box by ID', async () => {
    expect(await controller.findOne('1')).toEqual({
      id: '1',
      name: 'Test Box',
      slug: 'test-box',
      locationId: 'location-1',
      sealed: false,
    });
  });

  it('should create a box', async () => {
    const dto = {
      name: 'New Box',
      slug: 'new-box',
      sealed: false,
      location: { connect: { id: 'location-1' } }
    };
    expect(await controller.create(dto)).toEqual({
      id: '2',
      name: 'New Box',
      slug: 'new-box',
      locationId: 'location-1',
      sealed: false,
    });
  });

  it('should update a box', async () => {
    const dto = { name: 'Updated Box' };
    expect(await controller.update('1', dto)).toEqual({
      id: '1',
      name: 'Updated Box',
    });
  });

  it('should delete a box', async () => {
    expect(await controller.delete('1')).toEqual({});
  });
});
