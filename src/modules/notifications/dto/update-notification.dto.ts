import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  message?: string;
}
