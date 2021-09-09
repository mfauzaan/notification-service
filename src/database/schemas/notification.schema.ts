import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';

export class Notification {
  @Expose()
  _id: string;

  @Prop()
  @Expose()
  @ApiProperty()
  entityId: string;

  @Prop()
  @Expose()
  @ApiProperty()
  notificationType: string;

  @Prop()
  @Expose()
  @ApiProperty()
  channel: string;

  @Prop()
  @Expose()
  @ApiProperty()
  entity: string;

  @Prop()
  @Expose()
  @ApiProperty()
  userId: string;

  @Prop()
  @Expose()
  @ApiProperty()
  companyId: string;

  @Prop({
    default: 'pending',
  })
  @Expose()
  @ApiProperty()
  status: string;

  @Prop()
  @Expose()
  @ApiProperty()
  content: string;

  @Expose()
  @ApiProperty()
  createdAt: string;

  @Expose()
  @ApiProperty()
  updatedAt: string;
}
