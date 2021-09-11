import { Injectable, OnModuleInit } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { find } from 'lodash';
import { InjectModel } from 'nestjs-typegoose';
import { Subscription } from 'src/database/schemas/subscription.schema';
import { GetUserSubscriptionsOptionsDto } from './dto/get-user-subscriptions.dto';
import { SubscriptionSeeds } from './subscriptions.seeders';

@Injectable()
export class SubscriptionsService implements OnModuleInit {
  constructor(
    @InjectModel(Subscription)
    private readonly subscriptionModel: ReturnModelType<typeof Subscription>,
  ) {}

  async onModuleInit() {
    SubscriptionSeeds.forEach((seed: any) => {
      this.subscriptionModel
        .findOneAndUpdate(seed, seed, { upsert: true, useFindAndModify: false })
        .exec();
    });
  }

  async isSubscribed(
    channel: string,
    { userId, companyId }: { userId: string; companyId: string },
  ): Promise<boolean> {
    // if not in the list consider as subscribed for backward compatibilities:
    let isSubscribed = true;

    const subscription = await this.subscriptionModel.findOne({
      $or: [
        { subscribeId: userId, subscribeType: 'user' },
        { subscribeId: companyId, subscribeType: 'company' },
      ],
      'channels.channel': channel,
      'channels.isSubscribe': false,
    });

    if (subscription) {
      const hasChannel = !!find(subscription?.channels, {
        channel,
        isSubscribe: true,
      });
      isSubscribed = hasChannel;
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
