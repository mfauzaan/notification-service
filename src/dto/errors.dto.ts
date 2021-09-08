import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorDto {
  @Expose()
  @ApiProperty()
  status: number;

  @Expose()
  @ApiProperty()
  error: string;

  @Expose()
  @ApiProperty()
  message: string;
}
