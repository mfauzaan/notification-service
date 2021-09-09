import { Test, TestingModule } from '@nestjs/testing';
import { NotificationTypesService } from './notification-types.service';

describe('NotificationTypesService', () => {
  let service: NotificationTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationTypesService],
    }).compile();

    service = module.get<NotificationTypesService>(NotificationTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
