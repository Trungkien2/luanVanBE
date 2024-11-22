import { Controller, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { CrudController } from 'src/core/Base/crud.controller';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
@ApiTags('conversations')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class ConversationsController extends CrudController<ConversationsService> {
  constructor(private readonly convesationsService: ConversationsService) {
    super(convesationsService);
  }
}
