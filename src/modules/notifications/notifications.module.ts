import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Notification } from 'src/database/schemas/notification.schema';
import { ChannelsModule } from '../channels/channels.module';
import { NotificationTypesModule } from '../notification-types/notification-types.module';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { UsersModule } from '../users/users.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsProcessor } from './notifications.processor';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [
    TypegooseModule.forFeature([Notification]),
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
})
export class NotificationsModule {}
