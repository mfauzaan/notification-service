import { Module } from '@nestjs/common';
import { NotificationTypesModule } from '../notification-types/notification-types.module';
import { ChannelsFactory } from './channels.factory';

@Module({
  imports: [NotificationTypesModule],
  providers: [ChannelsFactory],
  exports: [ChannelsFactory],
})
export class ChannelsModule {}
