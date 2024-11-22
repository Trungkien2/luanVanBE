import { Controller, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { CrudController } from 'src/core/Base/crud.controller';
import { ConversationMembersService } from './conversation_members.service';

@Controller('conversation-members')
@ApiTags('conversation-members')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class ConversationMembersController extends CrudController<ConversationMembersService> {
  constructor(
    private readonly conversationMembersService: ConversationMembersService,
  ) {
    super(conversationMembersService);
  }
}
