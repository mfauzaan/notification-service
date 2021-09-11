import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { NotificationTypesService } from '../notification-types/notification-types.service';

@Injectable()
export class ChannelsFactory {
  constructor(
    private readonly notificationTypesService: NotificationTypesService,
  ) {}
  private logger = new Logger();

  async process(slug, options) {
    const { user, notificationType } = options;

    const channelTypes = {
      email: this.email,
      sms: this.sms,
      whatsapp: this.whatsapp,
      UI: this.UI,
    };

    if (!channelTypes) throw new BadRequestException('Invalid channel');

    // Render content and title:
    const [title, content] = await Promise.all([
      this.notificationTypesService.renderTemplete(
        notificationType.templates.title,
        user,
      ),
      this.notificationTypesService.renderTemplete(
        notificationType.templates.content,
        user,
      ),
    ]);

    return channelTypes[slug]({
      ...options,
      content,
      title,
    }).catch(e => this.logger.error(e));
  }

  async email(options) {
    const { title, content } = options;
    console.warn('Email send to the user', {
      title,
      content,
    });
  }

  async sms(options) {
    const { content } = options;
    console.warn('SMS send to the user', {
      content,
    });
  }

  async whatsapp(options) {
    const { title, content } = options;
    console.warn('Whatsapp push notification send to the user', {
      title,
      content,
    });
  }

  async UI(options) {
    const { content } = options;
    console.warn('UI notification send to the user', {
      content,
    });
  }
}
