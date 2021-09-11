import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Queue } from 'bull';
import { InjectModel } from 'nestjs-typegoose';
import { Notification } from 'src/database/schemas/notification.schema';
import { ChannelsFactory } from '../channels/channels.factory';
import { NotificationTypesService } from '../notification-types/notification-types.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
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
    private readonly notificationTypesService: NotificationTypesService,
    private readonly subscriptionsService: SubscriptionsService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { userId, companyId, channel } = createNotificationDto;

    // Check subscription state:
    const isSubscribed = await this.subscriptionsService.isSubscribed(channel, {
      userId,
      companyId,
    });

    if (!isSubscribed)
      throw new BadRequestException(
        'User/Company is not subscribed to the channel',
      );

    // Get the template:
    const [notificationType, user] = await Promise.all([
      this.notificationTypesService.findByTemplate(
        createNotificationDto.notificationType,
        channel,
      ),
      this.userDetails.getUserDetails({ userId, companyId }),
    ]);

    // Create notification:
    const notification = await this.notificationModel.create(
      createNotificationDto,
    );

    // Push to queue:
    await this.notificationsQueue.add('send-notifications', {
      notification,
      user,
      notificationType,
    });

    return {
      status: 'success',
      message:
        "We've started to process the request, please check the status page for the update",
    };
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return await this.notificationModel.updateOne(
      {
        _id: id,
      },
      updateNotificationDto,
    );
  }

  async sendNotifications(options) {
    const { notification } = options;
    try {
      // Dynamic inject function name:
      const message = await this.channelsFactory.process(
        notification.channel,
        options,
      );

      // Update status:
      await this.update(notification._id, { status: 'success', message });
    } catch (error) {
      await this.update(notification._id, { status: 'failed' });
    }
  }
}
