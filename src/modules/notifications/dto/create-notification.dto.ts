import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty()
  @IsMongoId()
  entityId: string;

  @ApiProperty()
  @IsMongoId()
  companyId: string;

  @ApiProperty()
  @IsString()
  notificationType: string;

  @ApiProperty()
  @IsString()
  entity: string;

  @ApiProperty()
  @IsMongoId()
  userId: string;

  @ApiProperty()
  @IsOptional()
  channel: string;
}
