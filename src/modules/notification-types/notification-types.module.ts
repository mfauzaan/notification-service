import { Module } from '@nestjs/common';
import { NotificationTypesService } from './notification-types.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { NotificationType } from 'src/database/schemas/notification-types.schema';

@Module({
  imports: [TypegooseModule.forFeature([NotificationType])],
  providers: [NotificationTypesService],
  exports: [NotificationTypesService],
})
export class NotificationTypesModule {}
