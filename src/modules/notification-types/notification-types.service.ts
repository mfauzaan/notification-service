import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { format } from 'date-fns';
import { first, isEmpty } from 'lodash';
import { render } from 'mustache';
import { InjectModel } from 'nestjs-typegoose';
import { NotificationType } from 'src/database/schemas/notification-types.schema';
import { NotificationTypesSeeds } from './notification-types.seeders';

@Injectable()
export class NotificationTypesService implements OnModuleInit {
  constructor(
    @InjectModel(NotificationType)
    private readonly notificationTypeModel: ReturnModelType<
      typeof NotificationType
    >,
  ) {}

  async onModuleInit() {
    NotificationTypesSeeds.forEach((seed: any) => {
      this.notificationTypeModel
        .findOneAndUpdate(seed, seed, { upsert: true, useFindAndModify: false })
        .exec();
    });
  }

  async findAll(): Promise<NotificationType[]> {
    return await this.notificationTypeModel.find().exec();
  }

  async findByTemplate(slug: string, channel: string) {
    const notificationType = await this.notificationTypeModel.findOne({
      name: slug,
      'templates.channel': channel,
    });

    if (!notificationType || isEmpty(notificationType.templates))
      throw new BadRequestException('Templete not found');

    return {
      ...notificationType,
      templates: first(notificationType.templates),
    };
  }

  renderTemplete(content, user): string {
    if (!content) {
      return '';
    }

    const mappedValues = {
      firstName: user.firstName,
      secondName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      dob: user.dob,
      companyName: user.company.name,
      year: format(new Date(), 'yyyy'),
      month: format(new Date(), 'MMMM'),
    };

    return render(content, mappedValues);
  }
}
