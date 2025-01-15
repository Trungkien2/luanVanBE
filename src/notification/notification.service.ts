import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { CrudService } from 'src/core/Base/crud.service';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService extends CrudService<Notification> {
  constructor() {
    super(Notification);
  }
 
}
