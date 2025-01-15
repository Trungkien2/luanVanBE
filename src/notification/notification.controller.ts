import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { CrudController } from 'src/core/Base/crud.controller';

@Controller('notification')
export class NotificationController extends CrudController<NotificationService> {
  constructor(private readonly notificationService: NotificationService) {
    super(notificationService);
  }

  
}
