import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { first, isEmpty } from 'lodash';
import { InjectModel } from 'nestjs-typegoose';
import { NotificationType } from 'src/database/schemas/notification-types.schema';

@Injectable()
export class NotificationTypesService implements OnModuleInit {
  constructor(
    @InjectModel(NotificationType)
    private readonly notificationTypeModel: ReturnModelType<
      typeof NotificationType
    >,
  ) {}

  async onModuleInit() {
    // await this.notificationTypeModel.create({
    //   name: 'monthly-payslip',
    //   templates: [
    //     {
    //       title: 'Happy Birthday {{firstName}}',
    //       conent: '{{companyName}} is wishing you a happy birthday',
    //       channel: 'UI',
    //     },
    //   ],
    // });
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
}
