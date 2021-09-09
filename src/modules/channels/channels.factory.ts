import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ChannelsFactory {
  private logger = new Logger();

  async process(slug) {
    const channelTypes = {
      email: this.email,
      sms: this.sms,
      whatsapp: this.whatsapp,
      UI: this.UI,
    };

    if (!channelTypes) throw new BadRequestException('Invalid channel');

    return channelTypes[slug]();
  }

  async email() {
    console.log('email');
    return 'UI processed';
  }

  async sms() {
    console.log('sms');
    return 'UI processed';
  }

  async whatsapp() {
    console.log('whatsapp');
    return 'UI processed';
  }

  async UI() {
    console.log('UI');
    return 'UI processed';
  }
}
