import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Subscription } from 'src/database/schemas/subscription.schema';
import { SubscriptionsService } from './subscriptions.service';

@Module({
  imports: [TypegooseModule.forFeature([Subscription])],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
