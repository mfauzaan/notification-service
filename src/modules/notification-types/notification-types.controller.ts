import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateNotificationTypeDto } from './dto/create-notification-type.dto';
import { UpdateNotificationTypeDto } from './dto/update-notification-type.dto';
import { NotificationTypesService } from './notification-types.service';

@Controller('notification-types')
export class NotificationTypesController {
  constructor(
    private readonly notificationTypesService: NotificationTypesService,
  ) {}

  @Post()
  create(@Body() createNotificationTypeDto: CreateNotificationTypeDto) {
    return this.notificationTypesService.create(createNotificationTypeDto);
  }

  @Get()
  findAll() {
    return this.notificationTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationTypeDto: UpdateNotificationTypeDto,
  ) {
    return this.notificationTypesService.update(+id, updateNotificationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationTypesService.remove(+id);
  }
}
