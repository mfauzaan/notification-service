import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';
import { Schema } from 'mongoose';

export class Templates {
  @Expose()
  _id: string;

  @Prop()
  @Expose()
  @ApiProperty()
  title: string;

  @Prop({
    type: Schema.Types.Mixed,
  })
  @Expose()
  @ApiProperty()
  channel: string;

  @Prop({
    type: Schema.Types.Mixed,
  })
  @Expose()
  @ApiProperty()
  content: Record<string, any>;

  @Expose()
  @ApiProperty()
  createdAt: string;

  @Expose()
  @ApiProperty()
  updatedAt: string;
}

export class NotificationType {
  @Expose()
  _id: string;

  @Prop()
  @Expose()
  @ApiProperty()
  name: string;

  @Prop({
    type: Schema.Types.Mixed,
  })
  @Expose()
  @ApiProperty()
  templates: Templates[];

  @Expose()
  @ApiProperty()
  createdAt: string;

  @Expose()
  @ApiProperty()
  updatedAt: string;
}
