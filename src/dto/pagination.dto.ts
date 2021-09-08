import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginatedDto {
  @Expose()
  @ApiProperty()
  page: number;

  @Expose()
  @ApiProperty()
  perPage: number;

  @Expose()
  @ApiProperty()
  lastPage: number;

  @Expose()
  @ApiProperty()
  total: number;
}

export class PaginationOptionsDto {
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  perPage?: number;
}
