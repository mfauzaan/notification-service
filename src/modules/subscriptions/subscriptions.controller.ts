import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializerInterceptor } from 'src/utils/serializer.interceptor';
import {
  GetUserSubscriptionsDto,
  GetUserSubscriptionsOptionsDto,
} from './dto/get-user-subscriptions.dto';
import { SubscriptionsService } from './subscriptions.service';

@ApiTags('Notifications')
@Controller('notifications/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  @ApiResponse({ status: 200, type: GetUserSubscriptionsDto, isArray: true })
  @UseInterceptors(new SerializerInterceptor(GetUserSubscriptionsDto))
  getUserSubscriptions(
    @Query() getUserSubscriptionsDto: GetUserSubscriptionsOptionsDto,
  ) {
    return this.subscriptionsService.getByUser(getUserSubscriptionsDto);
  }
}
