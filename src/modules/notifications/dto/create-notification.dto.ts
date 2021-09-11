import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsMongoId()
  entityId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entity?: string;

  @ApiProperty()
  @IsMongoId()
  companyId: string;

  @ApiProperty()
  @IsString()
  notificationType: string;

  @ApiProperty()
  @IsMongoId()
  userId: string;

  @ApiProperty()
  @IsOptional()
  channel: string;
}
