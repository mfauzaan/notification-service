import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { Notification } from 'src/database/schemas/notification.schema';
import { NotificationsService } from './notifications.service';

@Processor('notifications')
export class NotificationsProcessor {
  constructor(private readonly notificationsService: NotificationsService) {}
  private readonly logger = new Logger(NotificationsProcessor.name);

  @Process('send-notifications')
  async notifications(job: Job<Notification>) {
    try {
      this.logger.debug('Start send notification');
      await this.notificationsService.sendNotifications(job.data);
      this.logger.debug('Notification send successfully');
      return {};
    } catch (error) {
      this.logger.error(error);
    }
  }
}
