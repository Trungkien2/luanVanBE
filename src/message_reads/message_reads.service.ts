import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { MessageRead } from './entities/message_read.entity';

@Injectable()
export class MessageReadsService extends CrudService<MessageRead> {
  constructor() {
    super(MessageRead);
  }
}
