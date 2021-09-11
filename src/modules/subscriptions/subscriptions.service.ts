import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { isEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { Subscription } from 'src/database/schemas/subscription.schema';
import { first } from 'lodash';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription)
    private readonly subscriptionModel: ReturnModelType<typeof Subscription>,
  ) {}

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
      'channels.type': channel,
    });

    if (subscription && !isEmpty(subscription.channels)) {
      const channel = first(subscription.channels);
      if (!channel?.isSubscribe) {
        isSubscribed = false;
      }
    }

    return isSubscribed;
  }
}
