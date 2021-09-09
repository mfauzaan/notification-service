import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Queue } from 'bull';
import { InjectModel } from 'nestjs-typegoose';
import { Notification } from 'src/database/schemas/notification.schema';
import { ChannelsFactory } from '../channels/channels.factory';
import { UsersService } from '../users/users.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification)
    private readonly notificationModel: ReturnModelType<typeof Notification>,
    @InjectQueue('notifications')
    private readonly notificationsQueue: Queue,
    private readonly userDetails: UsersService,
    private readonly channelsFactory: ChannelsFactory,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { userId, companyId } = createNotificationDto;
    // Create notification:
    const notification = await this.notificationModel.create(
      createNotificationDto,
    );

    // Get the templete:
    // Validate the request:
    // Get User details:
    const user = await this.userDetails.getUserDetails({ userId, companyId });

    // Push to queue:
    await this.notificationsQueue.add('send-notifications', {
      notification,
      user,
    });

    return {
      status: 'success',
      message:
        "We've started to process the request, please check the status page for the update",
    };
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return await this.notificationModel.updateOne(
      {
        _id: id,
      },
      updateNotificationDto,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }

  async sendNotifications(options) {
    const { notification, user } = options;
    try {
      // Dynamic inject function name:
      await this.channelsFactory.process(notification.channel);

      // Update status:
      await this.update(notification._id, { status: 'success' });
    } catch (error) {
      await this.update(notification._id, { status: 'failed' });
    }
  }
}
