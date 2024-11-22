import { MessageService } from './message.service';

import { Controller, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwtGuard';
import { CrudController } from 'src/core/Base/crud.controller';

@Controller('message')
@ApiTags('message')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class MessageController extends CrudController<MessageService> {
  constructor(private readonly convesationsService: MessageService) {
    super(convesationsService);
  }
}
