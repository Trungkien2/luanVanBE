import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/core/Base/crud.service';
import { ConversationMember } from './entities/conversation_member.entity';

@Injectable()
export class ConversationMembersService extends CrudService<ConversationMember> {
  constructor() {
    super(ConversationMember);
  }
}
