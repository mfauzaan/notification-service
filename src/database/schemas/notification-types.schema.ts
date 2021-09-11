import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, Prop, Severity } from '@typegoose/typegoose';
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

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class NotificationType {
  @Expose()
  _id: string;

  @Prop()
  @Expose()
  @ApiProperty()
  name: string;

  @Prop({
    type: Schema.Types.Array,
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
