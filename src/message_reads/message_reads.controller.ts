import { Controller, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { CrudController } from 'src/core/Base/crud.controller';
import { MessageReadsService } from './message_reads.service';

@Controller('message-reads')
@ApiTags('message-reads')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class MessageController extends CrudController<MessageReadsService> {
  constructor(private readonly messageReadService: MessageReadsService) {
    super(messageReadService);
  }
}
