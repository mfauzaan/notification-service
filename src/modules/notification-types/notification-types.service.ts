import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { format } from 'date-fns';
import { first, isEmpty } from 'lodash';
import { render } from 'mustache';
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
    const seedData = [
      {
        name: 'monthly-payslip',
        templates: [
          {
            title: 'Pay slip for {{month}} {{year}}',
            content: 'Hi {{fullName}}, Your salary has been processed',
            channel: 'email',
          },
        ],
      },
      {
        name: 'leaves-reminder',
        templates: [
          {
            content:
              'Hi {{firstName}}, Reminder to book your leaves before it expires.',
            channel: 'UI',
          },
        ],
      },
      {
        name: 'happy-birthday',
        templates: [
          {
            content: 'Happy Birthday {{firstName}}.',
            channel: 'UI',
          },
          {
            title: '{{companyName}} is wishing you a happy birthday',
            content: 'Happy Birthday {{firstName}}.',
            channel: 'email',
          },
        ],
      },
    ];

    seedData.forEach((seed: any) => {
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
