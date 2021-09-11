import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { Subscription } from 'src/database/schemas/subscription.schema';

export class GetUserSubscriptionsDto extends Subscription {}

export class GetUserSubscriptionsOptionsDto {
  @ApiProperty()
  @IsMongoId()
  userId: string;

  @ApiProperty()
  @IsMongoId()
  companyId: string;
}
