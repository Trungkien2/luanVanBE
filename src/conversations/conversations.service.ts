import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { Conversation } from './entities/conversation.entity';

@Injectable()
export class ConversationsService extends CrudService<Conversation> {
  constructor() {
    super(Conversation);
  }
}
