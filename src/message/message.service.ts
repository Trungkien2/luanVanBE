import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService extends CrudService<Message> {
  constructor() {
    super(Message);
  }
}
