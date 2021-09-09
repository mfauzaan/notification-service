import { Test, TestingModule } from '@nestjs/testing';
import { NotificationTypesController } from './notification-types.controller';
import { NotificationTypesService } from './notification-types.service';

describe('NotificationTypesController', () => {
  let controller: NotificationTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationTypesController],
      providers: [NotificationTypesService],
    }).compile();

    controller = module.get<NotificationTypesController>(NotificationTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
