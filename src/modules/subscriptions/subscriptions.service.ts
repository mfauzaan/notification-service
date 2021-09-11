import { Injectable, OnModuleInit } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { isEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { Subscription } from 'src/database/schemas/subscription.schema';
import { GetUserSubscriptionsOptionsDto } from './dto/get-user-subscriptions.dto';

@Injectable()
export class SubscriptionsService implements OnModuleInit {
  constructor(
    @InjectModel(Subscription)
    private readonly subscriptionModel: ReturnModelType<typeof Subscription>,
  ) {}

  async onModuleInit() {
    const seedData = [
      {
        subscribeId: '6139e643ffa5f94b5fefae22',
        subscribeType: 'user',
        channels: [
          {
            channel: 'UI',
            isSubscribe: true,
          },
          {
            channel: 'email',
            isSubscribe: false,
          },
        ],
      },
      {
        subscribeId: '6138a385dc0d997f5c54585b',
        subscribeType: 'company',
        channels: [
          {
            channel: 'UI',
            isSubscribe: true,
          },
        ],
      },
      {
        subscribeId: '6139e643ffa5f94b5fefae21',
        subscribeType: 'user',
        channels: [
          {
            channel: 'UI',
            isSubscribe: true,
          },
          {
            channel: 'email',
            isSubscribe: true,
          },
        ],
      },
      {
        subscribeId: '6138a385dc0d997f5c54585c',
        subscribeType: 'company',
        channels: [
          {
            channel: 'UI',
            isSubscribe: true,
          },
        ],
      },
    ];

    seedData.forEach((seed: any) => {
      this.subscriptionModel
        .findOneAndUpdate(seed, seed, { upsert: true, useFindAndModify: false })
        .exec();
    });
  }

  async isSubscribed(
    channel: string,
    { userId, companyId }: { userId: string; companyId: string },
  ): Promise<boolean> {
    // if not in the list consider as subscriped for backward compatiblies:
    let isSubscribed = true;

    const subscription = await this.subscriptionModel.findOne({
      $or: [
        { subscribeId: userId, subscribeType: 'user' },
        { subscribeId: companyId, subscribeType: 'company' },
      ],
      'channels.channel': channel,
      'channels.isSubscribe': false,
    });

    if (subscription && !isEmpty(subscription.channels)) {
      isSubscribed = false;
    }

    return isSubscribed;
  }

  async getByUser(options: GetUserSubscriptionsOptionsDto) {
    const { userId, companyId } = options;

    // Get User:
    const subscription = await this.subscriptionModel.find({
      $or: [
        { subscribeId: userId, subscribeType: 'user' },
        { subscribeId: companyId, subscribeType: 'company' },
      ],
    });

    return subscription;
  }
}
