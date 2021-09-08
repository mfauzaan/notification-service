import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessDto {
  @Expose()
  @ApiProperty()
  success: boolean;
}
