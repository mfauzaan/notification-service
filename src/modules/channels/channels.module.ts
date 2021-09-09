import { Module } from '@nestjs/common';
import { ChannelsFactory } from './channels.factory';

@Module({
  providers: [ChannelsFactory],
  exports: [ChannelsFactory],
})
export class ChannelsModule {}
