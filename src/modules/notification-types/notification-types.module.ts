import { Module } from '@nestjs/common';
import { NotificationTypesService } from './notification-types.service';
import { NotificationTypesController } from './notification-types.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { NotificationType } from 'src/database/schemas/notification-types.schema';

@Module({
  imports: [TypegooseModule.forFeature([NotificationType])],
  controllers: [NotificationTypesController],
  providers: [NotificationTypesService],
  exports: [NotificationTypesService],
})
export class NotificationTypesModule {}
