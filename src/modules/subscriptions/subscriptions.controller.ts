import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SerializerInterceptor } from 'src/utils/serializer.interceptor';
import {
  GetUserSubscriptionsDto,
  GetUserSubscriptionsOptionsDto,
} from './dto/get-user-subscriptions.dto';
import { SubscriptionsService } from './subscriptions.service';

@Controller('notifications/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  @ApiResponse({ status: 200, type: GetUserSubscriptionsDto })
  @UseInterceptors(new SerializerInterceptor(GetUserSubscriptionsDto))
  getUserSubscriptions(
    @Query() getUserSubscriptionsDto: GetUserSubscriptionsOptionsDto,
  ) {
    return this.subscriptionsService.getByUser(getUserSubscriptionsDto);
  }
}
