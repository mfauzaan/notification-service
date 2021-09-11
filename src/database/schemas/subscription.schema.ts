import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';
import { Schema } from 'mongoose';

export class SubscriptionChannel {
  @Expose()
  _id: string;

  @Prop({
    type: Schema.Types.String,
  })
  @Expose()
  @ApiProperty()
  channel: string;

  @Prop({
    type: Schema.Types.Boolean,
  })
  @Expose()
  @ApiProperty()
  isSubscribe: boolean;

  @Expose()
  @ApiProperty()
  createdAt: string;

  @Expose()
  @ApiProperty()
  updatedAt: string;
}

export class Subscription {
  @Expose()
  _id: string;

  @Prop()
  @Expose()
  @ApiProperty()
  subscribeId: string;

  @Prop()
  @Expose()
  @ApiProperty()
  subscribeType: string;

  @Prop({
    type: Schema.Types.Array,
  })
  @Expose()
  @ApiProperty()
  channels: SubscriptionChannel[];

  @Expose()
  @ApiProperty()
  createdAt: string;

  @Expose()
  @ApiProperty()
  updatedAt: string;
}
