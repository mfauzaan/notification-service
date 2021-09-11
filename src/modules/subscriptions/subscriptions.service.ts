import { Injectable, OnModuleInit } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { isEmpty } from 'class-validator';
import { first } from 'lodash';
import { InjectModel } from 'nestjs-typegoose';
import { Subscription } from 'src/database/schemas/subscription.schema';

@Injectable()
export class SubscriptionsService implements OnModuleInit {
  constructor(
    @InjectModel(Subscription)
    private readonly subscriptionModel: ReturnModelType<typeof Subscription>,
  ) {}

  async onModuleInit() {
    // await this.subscriptionModel.create({
    //   subscribeId: '6139e643ffa5f94b5fefae22',
    //   subscribeType: 'user',
    //   channels: [
    //     {
    //       channel: 'UI',
    //       isSubscribe: false,
    //     },
    //   ],
    // });
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
}
