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

  @Prop()
  @Expose()
  @ApiProperty()
  channel: string;

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

export class NotificationType {
  @Expose()
  _id: string;

  @Prop()
  @Expose()
  @ApiProperty()
  name: string;

  @Prop({
    type: Schema.Types.Map,
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
