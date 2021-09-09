import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { NotificationType } from 'src/database/schemas/notification-types.schema';
import { CreateNotificationTypeDto } from './dto/create-notification-type.dto';
import { UpdateNotificationTypeDto } from './dto/update-notification-type.dto';

@Injectable()
export class NotificationTypesService {
  constructor(
    @InjectModel(NotificationType)
    private readonly notificationTypeModel: ReturnModelType<
      typeof NotificationType
    >,
  ) {}

  create(createNotificationTypeDto: CreateNotificationTypeDto) {
    return 'This action adds a new notificationType';
  }

  async findAll(): Promise<NotificationType[]> {
    return await this.notificationTypeModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationType`;
  }

  update(id: number, updateNotificationTypeDto: UpdateNotificationTypeDto) {
    return `This action updates a #${id} notificationType`;
  }

  remove(id: number) {
    return `This action removes a #${id} notificationType`;
  }
}
