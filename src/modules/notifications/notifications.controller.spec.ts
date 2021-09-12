import { BullModule } from '@nestjs/bull';
import { BadRequestException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypegooseModule } from 'nestjs-typegoose';
import { Notification } from 'src/database/schemas/notification.schema';
import { ChannelsModule } from '../channels/channels.module';
import { NotificationTypesModule } from '../notification-types/notification-types.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { UsersModule } from '../users/users.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsProcessor } from './notifications.processor';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let userId: '6139e643ffa5f94b5fefae21';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypegooseModule.forFeature([Notification]),
        TypegooseModule.forRoot(process.env.MONGO_CONNECTION_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
        BullModule.registerQueue({
          name: 'notifications',
        }),
        UsersModule,
        ChannelsModule,
        NotificationTypesModule,
        SubscriptionsModule,
      ],
      controllers: [NotificationsController],
      providers: [NotificationsService, NotificationsProcessor],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Notification Controller', () => {
    it('Invalid Template', () => {
      controller
        .create({
          userId: '6139e643ffa5f94b5fefae21',
          companyId: '6138a385dc0d997f5c54585c',
          notificationType: 'monthly-payslip',
          channel: 'UI',
        })
        .then(createData => {
          expect(createData).toThrow(BadRequestException);
        });
    });

    it('User not subscribed to channel: Email', () => {
      controller
        .create({
          userId: '6139e643ffa5f94b5fefae22',
          companyId: '6138a385dc0d997f5c54585b',
          notificationType: 'monthly-payslip',
          channel: 'email',
        })
        .then(createData => {
          expect(createData).toThrow(BadRequestException);
        });
    });

    it('Company not subscribed to the channel: Email', () => {
      controller
        .create({
          userId: '6139e643ffa5f94b5fefae21',
          companyId: '6138a385dc0d997f5c54585c',
          notificationType: 'monthly-payslip',
          channel: 'email',
        })
        .then(createData => {
          expect(createData).toThrow(BadRequestException);
        });
    });
  });
});
